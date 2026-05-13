import Router from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";
import { validateCreateProduct, validateDeleteProduct } from "../middlewares/product.validator.js";

const router = Router();

router.get("/products", getProducts);
router.post("/products", validateCreateProduct, createProduct);
router.put("/products/:id", validateCreateProduct, updateProduct);
router.delete("/products/:id",validateDeleteProduct ,deleteProduct);

export default router;
