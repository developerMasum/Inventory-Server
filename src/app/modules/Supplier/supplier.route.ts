import { Router } from "express";
import { supplierController } from "./supplier.controller";

const router = Router();

// Create a new supplier
router.post("/", supplierController.createSupplierController);

router.get("/", supplierController.getAllSuppliersController);

// Get a supplier by ID
router.get("/:id", supplierController.getSupplierByIdController);

// Update a supplier by ID
router.put("/:id", supplierController.updateSupplierController);

// Delete a supplier by ID
router.delete("/:id", supplierController.deleteSupplierController);

export const supplierRoutes = router;
