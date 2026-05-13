import ProductSchema from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    let { limite = 5, desde = 0, all = "false" } = req.query;

    limite = Number(limite);
    desde = Number(desde);

    const query = all === "true" ? {} : { active: true };

    const [total, products] = await Promise.all([
      ProductSchema.countDocuments(query),
      ProductSchema.find(query)
        .limit(limite)
        .skip(desde)
        .sort({ createdAt: -1 })
        .populate("category", "name"),
    ]);

    res.status(200).json({
      ok: true,
      total,
      products,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductSchema.findById(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: "Producto no encontrado",
      });
    }

    const data = { ...req.body };

    if (data.name) {
      data.name = data.name.toUpperCase();
    }

    const updatedProduct = await ProductSchema.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      message: "Producto actualizado correctamente",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductSchema.findById(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: "Producto no encontrado",
      });
    }

    const deletedProduct = await ProductSchema.findByIdAndUpdate(
      id,
      { active: false },
      { new: true },
    );

    res.status(200).json({
      ok: true,
      message: "Producto eliminado correctamente",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

const restoreProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await ProductSchema.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró el producto",
      });
    }

    const product = await ProductSchema.findByIdAndUpdate(
      id,
      { active: true },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      message: "Producto restaurado correctamente",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};
export { createProduct, getProducts, updateProduct, deleteProduct, restoreProduct };
