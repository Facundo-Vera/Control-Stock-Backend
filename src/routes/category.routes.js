import Router from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  restoreCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { validateCreateCategory } from "../middlewares/categories.validator.js";

const router = Router();

router.get("/categories", getCategory);
router.post("/categories", validateCreateCategory, createCategory);
router.put("/categories/:id", validateCreateCategory, updateCategory);
router.delete("/categories/:id", deleteCategory);
router.patch("/categories/:id/restore", restoreCategory);

export default router;
