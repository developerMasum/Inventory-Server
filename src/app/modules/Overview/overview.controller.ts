import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { overviewService } from "./overview.service";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";

const LowStockAlert = catchAsync(async (req: Request, res: Response) => {
  const result = await overviewService.LowStockAlert();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Low StockAlert is shown successfully",
    data: result,
  });
});

export const overviewController = {
  LowStockAlert,
};
