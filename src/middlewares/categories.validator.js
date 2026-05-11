import { check } from "express-validator";
import handleValidationErrors from "./validator.js";

const validateCreateCategory = [
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("name", "Debe tener entre 3 y 50 caracteres").isLength({ min: 3, max: 50 }),
  handleValidationErrors,
];

export { validateCreateCategory };