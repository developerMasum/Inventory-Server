import { Prisma, Supplier } from "@prisma/client";
import prisma from "../../../shared/prisma";

const generateSupCode = async (): Promise<string> => {
  // Get all supplier IDs that start with "sup-"
  const suppliers = await prisma.supplier.findMany({
    select: { id: true },
  });

  const numbers = suppliers
    .map((s) => {
      const parts = s.id.split("-");
      if (parts[0] === "sup" && !isNaN(Number(parts[1]))) {
        return Number(parts[1]);
      }
      return 0;
    })
    .sort((a, b) => b - a);

  const nextNumber = (numbers[0] ? numbers[0] + 1 : 1)
    .toString()
    .padStart(3, "0");
  return `sup-${nextNumber}`;
};

const createSupplier = async (
  data: Prisma.SupplierCreateInput
): Promise<Supplier> => {
  const supId = await generateSupCode();

  return await prisma.supplier.create({
    data: {
      ...data,
      id: supId,
    },
  });
};

const getAllSuppliers = async (): Promise<Supplier[]> => {
  return await prisma.supplier.findMany();
};

// Get a supplier by ID
const getSupplierById = async (id: string): Promise<Supplier | null> => {
  return await prisma.supplier.findUnique({
    where: { id },
  });
};

// Update a supplier by ID
const updateSupplier = async (
  id: string,
  data: Prisma.SupplierUpdateInput
): Promise<Supplier> => {
  return await prisma.supplier.update({
    where: { id },
    data,
  });
};

const deleteSupplier = async (id: string): Promise<Supplier> => {
  return await prisma.supplier.delete({
    where: { id },
  });
};

export const supplierService = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
