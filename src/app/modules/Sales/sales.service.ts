import prisma from "../../../shared/prisma";

const createSales = async (payload: any) => {
  const { total, paymentMethod, items } = payload;

  return await prisma.$transaction(async (tx) => {
    // -------------------------------
    // STEP 1: Check Stock for All Items
    // -------------------------------
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

    // -------------------------------
    // STEP 2: Create Sale
    // -------------------------------
    const sale = await tx.sale.create({
      data: {
        total,
        paymentMethod,
      },
    });

    // -------------------------------
    // STEP 3: Create Sale Items + Reduce Stock
    // -------------------------------
    for (const item of items) {
      // Create sale item
      await tx.saleItem.create({
        data: {
          saleId: sale.id,
          productId: item.productId,
          qty: item.qty,
          unitPrice: item.unitPrice,
        },
      });

      // Reduce product stock
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.qty,
          },
        },
      });
    }

    // -------------------------------
    // STEP 4: Return Final Sale with Items
    // -------------------------------
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

export const salesService = {
  createSales,
};
