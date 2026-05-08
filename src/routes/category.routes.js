import Router from "express";
import { createCategory } from "../controllers/category.controller.js";
import { validateCreateCategory } from "../middlewares/categories.validator.js";

const router = Router();

router.post("/categories", validateCreateCategory, createCategory);


export default router;