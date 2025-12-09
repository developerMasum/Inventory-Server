import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { salesService } from "./sales.service";
import { salesFilterableFields } from "./sales.utils";

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
const getAllSalesController = catchAsync(async (req, res) => {
  const filters = pick(req.query, salesFilterableFields);
  const options = pick(req.query, ["limit", "page", "sort", "priceRange"]); // note: use 'sort' not 'sortBy'
  const query = { ...filters, ...options };

  const result = await salesService.getAllSales(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Total sales retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSalesOverTimeController = catchAsync(
  async (req: Request, res: Response) => {
    const { startDate, endDate, interval } = req.query;

    const result = await salesService.getSalesOverTime(
      startDate as string,
      endDate as string,
      (interval as "day" | "week" | "month" | "year") || "day"
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Sales over time retrieved successfully",
      data: result,
    });
  }
);

export const salesController = {
  createSalesController,
  getAllSalesController,
  getSalesOverTimeController,
};
