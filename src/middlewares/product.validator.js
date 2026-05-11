import { check, } from "express-validator";
import handleValidationErrors from "./validator.js";


export const validateCreateProduct = [
  check("name")
    .notEmpty()
    .withMessage("El nombre del producto es requerido")
    .isLength({ min: 3,  max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres"),

  check("price")
    .notEmpty()
    .withMessage("El precio es requerido")
    .isNumeric()
    .withMessage("El precio debe ser numérico"),

  check("stock")
    .notEmpty()
    .withMessage("El stock es requerido")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero positivo"),

  check("stockMin")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El stock mínimo debe ser positivo"),

  check("brand")
    .optional()
    .isLength({ max: 50 })
    .withMessage("La marca no puede superar los 50 caracteres"),

  check("typeVehicle")
    .notEmpty()
    .withMessage("El tipo de vehículo es requerido")
    .isIn(["Moto", "Auto"])
    .withMessage("El tipo de vehículo debe ser Moto o Auto"),

    handleValidationErrors,
];