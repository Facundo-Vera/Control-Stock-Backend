import ProductSchema from "../models/Product.js";

const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    

    const existingProduct = await ProductSchema.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({
        ok: false,
        message: "El producto ya existe",
      });
    }

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
