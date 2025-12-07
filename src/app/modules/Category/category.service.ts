import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
const createCategory = async (data: any) => {
  return await prisma.category.create({ data });
};

export const categoryService = {
  createCategory,
};
