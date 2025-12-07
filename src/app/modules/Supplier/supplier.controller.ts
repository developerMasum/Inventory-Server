import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { supplierService } from "./supplier.service";

const createSupplierController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await supplierService.createSupplier(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Supplier created successfully",
      data: result,
    });
  }
);

const getAllSuppliersController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await supplierService.getAllSuppliers();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Suppliers retrieved successfully",
      data: result,
    });
  }
);

const getSupplierByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await supplierService.getSupplierById(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Supplier retrieved successfully",
      data: result,
    });
  }
);

const updateSupplierController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await supplierService.updateSupplier(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Supplier updated successfully",
      data: result,
    });
  }
);

const deleteSupplierController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await supplierService.deleteSupplier(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Supplier deleted successfully",
      data: null,
    });
  }
);

export const supplierController = {
  createSupplierController,
  getAllSuppliersController,
  getSupplierByIdController,
  updateSupplierController,
  deleteSupplierController,
};
