import { Router } from "express";
import { salesController } from "./sales.controller";

const router = Router();
router.post("/create", salesController.createSalesController);

export const salesRoutes = router;
