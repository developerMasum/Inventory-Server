import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();
router.post("/", categoryController.createCategoryController);
router.get("/", categoryController.getAllCategoriesController);

export const categoryRoutes = router;
