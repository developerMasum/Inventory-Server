import { Router } from "express";
import { salesController } from "./sales.controller";

const router = Router();
router.post("/create", salesController.createSalesController);
router.get("/", salesController.getAllSalesController);
router.get("/over-time", salesController.getSalesOverTimeController);

export const salesRoutes = router;
