import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { salesService } from "./sales.service";

// CREATE SALE
const createSalesController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await salesService.createSales(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Sales created successfully",
      data: result,
    });
  }
);

export const salesController = {
  createSalesController,
};
