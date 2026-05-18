import Router from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  restoreProduct
} from "../controllers/product.controller.js";
import { validateCreateProduct, validateDeleteProduct } from "../middlewares/product.validator.js";
import { authenticate, validateRolAdmin } from "../middlewares/auth.validator.js";

const router = Router();

router.get("/products", getProducts);
router.post("/products",authenticate,validateRolAdmin, validateCreateProduct, createProduct);
router.put("/products/:id",authenticate,validateRolAdmin, validateCreateProduct, updateProduct);
router.delete("/products/:id",authenticate,validateRolAdmin,validateDeleteProduct ,deleteProduct);
router.patch("/products/:id/restore",authenticate,validateRolAdmin, validateDeleteProduct, restoreProduct);

export default router;
