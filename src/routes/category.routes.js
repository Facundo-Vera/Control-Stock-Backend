import Router from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  restoreCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { validateCreateCategory } from "../middlewares/categories.validator.js";
import { authenticate, validateRolAdmin } from "../middlewares/auth.validator.js";

const router = Router();

router.get("/categories", getCategory);
router.post("/categories",authenticate,validateRolAdmin, validateCreateCategory, createCategory);
router.put("/categories/:id", authenticate,validateRolAdmin,validateCreateCategory, updateCategory);
router.delete("/categories/:id",authenticate,validateRolAdmin, deleteCategory);
router.patch("/categories/:id/restore",authenticate,validateRolAdmin, restoreCategory);

export default router;
