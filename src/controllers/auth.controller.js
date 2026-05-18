import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({
      email,
      password,
      username,
    });
    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Usuario creado corectamente",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(403).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    const token = generateToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      ok: true,
      message: "Login exitoso!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  return res.status(200).json({
    ok: true,
    message: "Sesion cerrada exitosamente",
  });
};

const me = async (req, res) => {
  return res.status(200).json({
    ok: true,
    user: req.user,
  });
};

export { register, login, logout, me };