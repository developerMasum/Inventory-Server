import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";

type Interval = "day" | "week" | "month" | "year";

const createSales = async (payload: any) => {
  const { total, paymentMethod, items } = payload;

  return await prisma.$transaction(async (tx) => {
    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        select: { stock: true, name: true },
      });

      if (!product) {
        throw new Error(`Product not found`);
      }

      if (product.stock < item.qty) {
        throw new Error(
          `Not enough stock for product "${product.name}". Available: ${product.stock}, Required: ${item.qty}`
        );
      }
    }

    const sale = await tx.sale.create({
      data: {
        total,
        paymentMethod,
      },
    });

    for (const item of items) {
      await tx.saleItem.create({
        data: {
          saleId: sale.id,
          productId: item.productId,
          qty: item.qty,
          unitPrice: item.unitPrice,
        },
      });

      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.qty,
          },
        },
      });
    }

    return await tx.sale.findUnique({
      where: { id: sale.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  });
};

const getAllSales = async (query: Record<string, unknown>) => {
  // Allowed sorting fields for SALES
  const allowedSortFields = ["createdAt", "total"];
  let sortBy = (query.sort as string) || "-createdAt";

  let orderByField = "createdAt";
  let order: "asc" | "desc" = "desc";

  // Sort logic
  if (sortBy.startsWith("-")) {
    const field = sortBy.substring(1);
    if (allowedSortFields.includes(field)) {
      orderByField = field;
      order = "desc";
    }
  } else if (allowedSortFields.includes(sortBy)) {
    orderByField = sortBy;
    order = "asc";
  }

  const orderBy = {
    [orderByField]: order,
  } as Prisma.SaleOrderByWithRelationInput;

  // Pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  // Filters (exclude pagination & sort fields)
  const filterFields = ["sort", "page", "limit", "searchTerm"];
  const rawFilters: Record<string, unknown> = {};

  for (const key in query) {
    if (!filterFields.includes(key)) {
      rawFilters[key] = query[key];
    }
  }

  const where: Prisma.SaleWhereInput = {
    ...rawFilters,
  };

  // Search filter (id / paymentMethod)
  const searchTerm = query.searchTerm as string;
  if (searchTerm) {
    where.OR = [
      { id: { contains: searchTerm, mode: "insensitive" } },
      { paymentMethod: { equals: searchTerm as any } },
    ];
  }

  const [sales, total] = await Promise.all([
    prisma.sale.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    }),
    prisma.sale.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
    },
    result: sales,
  };
};

const getSalesOverTime = async (
  startDate: string,
  endDate: string,
  interval: Interval = "day"
) => {
  const sales = await prisma.sale.findMany({
    where: {
      createdAt: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    orderBy: { createdAt: "asc" },
  });

  // Helper to format date based on interval
  const formatDate = (date: Date) => {
    const d = new Date(date);
    switch (interval) {
      case "day":
        return d.toISOString().split("T")[0]; // YYYY-MM-DD
      case "week":
        const week = Math.ceil((d.getDate() - d.getDay() + 1) / 7); // crude week number
        return `${d.getFullYear()}-W${week}`;
      case "month":
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}`; // YYYY-MM
      case "year":
        return `${d.getFullYear()}`;
      default:
        return d.toISOString().split("T")[0];
    }
  };

  // Group sales by interval
  const grouped: Record<string, { totalSales: number; count: number }> = {};

  sales.forEach((sale) => {
    const key = formatDate(sale.createdAt);
    if (!grouped[key]) grouped[key] = { totalSales: 0, count: 0 };
    grouped[key].totalSales += Number(sale.total);
    grouped[key].count += 1;
  });

  // Convert to array
  const result = Object.keys(grouped)
    .sort()
    .map((key) => ({
      period: key,
      totalSales: grouped[key].totalSales,
      totalOrders: grouped[key].count,
    }));

  return result;
};

export const salesService = {
  createSales,
  getAllSales,
  getSalesOverTime,
};
