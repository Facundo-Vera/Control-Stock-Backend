import { Router } from "express";
import { login, logout, register, me } from "../controllers/auth.controller.js";

import {
  authenticate,
  validateLoginUser,
  validateRegisterUser,
} from "../middlewares/auth.validator.js";

const router = Router();

router.post("/register", validateRegisterUser, register);
router.post("/login", validateLoginUser, login);

router.post("/logout", authenticate, logout);
router.get("/me", authenticate, me);

export default router;
