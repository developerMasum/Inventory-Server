import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
const createCategory = async (data: any) => {
  return await prisma.category.create({ data });
};
const getAllCategories = async () => {
  return await prisma.category.findMany();
};

export const categoryService = {
  createCategory,
  getAllCategories,
};
