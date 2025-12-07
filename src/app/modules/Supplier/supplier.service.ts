import { Prisma, Supplier } from "@prisma/client";
import prisma from "../../../shared/prisma";

// Create a new supplier
const createSupplier = async (
  data: Prisma.SupplierCreateInput
): Promise<Supplier> => {
  return await prisma.supplier.create({ data });
};

// Get all suppliers
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
