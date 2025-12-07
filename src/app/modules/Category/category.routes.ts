import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();
router.post("/", categoryController.createCategoryController);

export const categoryRoutes = router;
