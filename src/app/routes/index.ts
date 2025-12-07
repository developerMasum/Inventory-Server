import express from "express";
import { productRoutes } from "../modules/Product/product.routes";
import { categoryRoutes } from "../modules/Category/category.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/product",
    route: productRoutes,
  },
  {
    path: "/category",
    route: categoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
