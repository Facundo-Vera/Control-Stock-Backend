import ProductSchema from "../models/Product.js";

const createProduct = async (req, res) => {
  try {
    const product = await ProductSchema.create(req.body);

    res.status(201).json({
      ok: true,
      message: "Producto creado exitosamente",
      product,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al crear el producto",
      error: error.message,
    });
  }
};

export { createProduct };
