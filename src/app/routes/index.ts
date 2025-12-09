import express from "express";
import { productRoutes } from "../modules/Product/product.routes";
import { categoryRoutes } from "../modules/Category/category.routes";
import { supplierRoutes } from "../modules/Supplier/supplier.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { salesRoutes } from "../modules/Sales/sales.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/product",
    route: productRoutes,
  },
  {
    path: "/category",
    route: categoryRoutes,
  },
  {
    path: "/supplier",
    route: supplierRoutes,
  },
  {
    path: "/sales",
    route: salesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
