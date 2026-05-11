import Sales from "../models/Sales.js";
import Product from "../models/Product.js";

const getOneSale = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await Sales.findById(id);

    if (!sale) {
      return res.status(404).json({
        ok: false,
        message: "Venta no encontrada",
      });
    }

    res.status(200).json({
      ok: true,
      sale,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al obtener venta",
    });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sales.find();

    res.status(200).json({
      ok: true,
      sales,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al obtener ventas",
    });
  }
};

const createSale = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        ok: false,
        message: "Debe agregar productos",
      });
    }

    const saleItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);

        if (!product) {
          throw new Error("Producto no encontrado");
        }

        if (product.stock < item.quantity) {
          throw new Error(`Stock insuficiente para ${product.name}`);
        }

        product.stock -= item.quantity;

        await product.save();

        return {
          product: product._id,
          productName: product.name,
          quantity: item.quantity,
          unitPrice: product.price,
        };
      }),
    );

    const sale = await Sales.create({
      items: saleItems,
      paymentMethod,
    });

    res.status(201).json({
      ok: true,
      message: "Venta creada correctamente",
      sale,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message || "Error al crear venta",
    });
  }
};

export { createSale, getOneSale ,getSales};
