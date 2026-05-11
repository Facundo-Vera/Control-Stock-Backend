import Category from "../models/Category.js";


const createCategory = async (req, res) => {
  try {
    const { name, type, } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        ok: false,
        message: "La categoría ya existe",
      });
    }

    const category = new Category({ name, type });
    await category.save();

    res.status(201).json({
      ok: true,
      message: "Categoría creada exitosamente",
      category,
    });
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    res.status(500).json({
      ok: false,
      message: "Error al crear la categoría",
    });
  }
};

export { createCategory };
