import { Router } from "express";
import { overviewController } from "./overview.controller";

const router = Router();
router.get("/low-stock-alert", overviewController.LowStockAlert);

export const OverviewRoute = router;
