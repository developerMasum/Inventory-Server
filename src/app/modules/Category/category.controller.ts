import { Request, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { categoryService } from "./category.service";
const createCategoryController = async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "category is created successfully",
    data: result,
  });
};
const getAllCategoriesController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await categoryService.getAllCategories();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Categories retrieved successfully",
      data: result,
    });
  }
);

export const categoryController = {
  createCategoryController,
  getAllCategoriesController,
};
