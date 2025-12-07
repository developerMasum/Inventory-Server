import prisma from "../../../shared/prisma";

const generateCategoryCode = async (): Promise<string> => {
  const count = await prisma.category.count();
  const nextNumber = count + 1;
  const paddedNumber = nextNumber.toString().padStart(3, "0");
  return `cat-${paddedNumber}`;
};

const createCategory = async (data: any) => {
  const categoryId = await generateCategoryCode();

  return await prisma.category.create({
    data: {
      id: categoryId,
      name: data.name,
    },
  });
};

const getAllCategories = async () => {
  return await prisma.category.findMany();
};

export const categoryService = {
  createCategory,
  getAllCategories,
};
