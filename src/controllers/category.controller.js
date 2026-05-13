import Category from "../models/Category.js";

const getCategory = async (req, res) => {
  try {
    const [total, category] = await Promise.all([
      Category.countDocuments({ active: true }),
      Category.find({ active: true }),
    ]);

    res.json({
      ok: true,
      total,
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener categorías",
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const name = req.body.name?.trim().toUpperCase();
    const { type } = req.body;

    if (!name) {
      return res.status(400).json({
        ok: false,
        message: "El nombre es obligatorio",
      });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        ok: false,
        message: "La categoría ya existe",
      });
    }

    const category = await Category.create({
      name,
      type,
      active: true,
    });

    res.status(201).json({
      ok: true,
      message: "Categoría creada exitosamente",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error al crear la categoría",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const name = req.body.name?.trim().toUpperCase();
    const { type } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (type) updateData.type = type;

    const existing = await Category.findOne({ name });

    if (existing && existing._id.toString() !== id) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe una categoría con ese nombre",
      });
    }

    const category = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!category) {
      return res.status(404).json({
        ok: false,
        message: "Categoría no encontrada",
      });
    }

    res.json({
      ok: true,
      message: "Categoría actualizada",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error al actualizar la categoría",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(
      id,
      { active: false },
      { new: true },
    );

    if (!category) {
      return res.status(404).json({
        ok: false,
        message: "Categoría no encontrada",
      });
    }

    res.json({
      ok: true,
      message: "Categoría eliminada",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error al eliminar la categoría",
    });
  }
};

const restoreCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(
      id,
      { active: true },
      { new: true },
    );

    if (!category) {
      return res.status(404).json({
        ok: false,
        message: "Categoría no encontrada",
      });
    }

    res.json({
      ok: true,
      message: "Categoría restaurada",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error al restaurar la categoría",
    });
  }
};

export {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  restoreCategory,
};
