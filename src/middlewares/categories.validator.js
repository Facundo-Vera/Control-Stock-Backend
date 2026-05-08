import { check } from "express-validator";
import handleValidationErrors from "./validator.js";

const validateCreateCategory = [
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("name", "Debe tener al menos 3 caracteres").isLength({ min: 3 }),
  handleValidationErrors,
];

export { validateCreateCategory };