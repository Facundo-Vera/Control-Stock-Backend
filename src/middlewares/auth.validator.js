import User from "../models/User.js";
import { check } from "express-validator";
import { verifyToken } from "../utils/jwt.js";
import handleValidationErrors from "./validator.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "La autenticación es requerida. Por favor envia un token",
      });
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      ok: false,
      message: "Token invalido o que ya está expirado ",
    });
  }
};

export const validateRegisterUser = [
  check("username")
    .notEmpty()
    .withMessage("El campo es obligatorio")
    .isString()
    .withMessage("El campo tiene que ser un string")
    .isLength({ min: 1, max: 30 })
    .withMessage("El nommbre de usuario debe tener entre 1 y 30 caracteres")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user && user.username === value) {
        throw new Error("El usuario ya existe");
      }
    }),

  check("email")
    .notEmpty()
    .withMessage("El campo es obligatorio")
    .isEmail()
    .withMessage("Ingresá un correo electrónico válido.")
    .custom(async (email) => {
      const userByEmail = await User.findOne({ email });
      if (userByEmail) {
        throw new Error("El email ya esta registrado");
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(
      "Debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número",
    ),
  handleValidationErrors,
];

export const validateLoginUser = [
  check("email")
    .notEmpty()
    .withMessage("El campo es obligatorio")
    .isEmail()
    .withMessage("Ingresa un correo electrónico válido"),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isString()
    .withMessage("El campo tiene que ser un string"),
  handleValidationErrors,
];

export const validateRolAdmin = (req, res, next) => {
  const rol = req.user.role;

  if (rol !== "admin") {
    return res.status(401).json({
      ok: false,
      message: "No tiene permisos para realizar esta accion ",
    });
  }
  next();
};
