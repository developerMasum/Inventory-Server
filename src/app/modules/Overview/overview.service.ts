import prisma from "../../../shared/prisma";

// Define the desired minimum stock level
const DESIRED_STOCK = 20;

const LowStockAlert = async () => {
  const products = await prisma.product.findMany({
    where: {
      stock: {
        lte: 10, // products with low stock
      },
    },
    orderBy: {
      stock: "asc",
    },
  });

  // Calculate restock quantity
  const restockInfo = products.map((product) => ({
    id: product.id,
    name: product.name,
    stock: product.stock,
    restockQuantity: DESIRED_STOCK - product.stock, // how many units to restock
  }));

  return restockInfo;
};

export const overviewService = {
  LowStockAlert,
};
