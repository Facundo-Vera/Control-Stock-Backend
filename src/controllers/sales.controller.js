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

    const validMethods = ["EFECTIVO", "TRANSFERENCIA", "TARJETA"];

    if (!validMethods.includes(paymentMethod)) {
      return res.status(400).json({
        ok: false,
        message: "Método de pago inválido",
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

        return {
          product: product._id,
          productName: product.name,
          quantity: item.quantity,
          unitPrice: product.price,
          subtotal: item.quantity * product.price,
        };
      }),
    );

    const total = saleItems.reduce((acc, item) => acc + item.subtotal, 0);

    const sale = await Sales.create({
      items: saleItems,
      paymentMethod,
      total,
    });

    await Promise.all(
      items.map(async (item) => {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }),
    );

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

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { items, paymentMethod } = req.body;

    // Buscar venta
    const sale = await Sales.findById(id);

    if (!sale) {
      return res.status(404).json({
        ok: false,
        message: "Venta no encontrada",
      });
    }

    // Validar items
    if (!items || items.length === 0) {
      return res.status(400).json({
        ok: false,
        message: "Debe agregar productos",
      });
    }

    // Validar método de pago
    const validMethods = ["EFECTIVO", "TRANSFERENCIA", "TARJETA"];

    if (!validMethods.includes(paymentMethod)) {
      return res.status(400).json({
        ok: false,
        message: "Método de pago inválido",
      });
    }

    await Promise.all(
      sale.items.map(async (item) => {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      })
    );


    const saleItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);

        if (!product) {
          throw new Error("Producto no encontrado");
        }

        if (product.stock < item.quantity) {
          throw new Error(`Stock insuficiente para ${product.name}`);
        }

        return {
          product: product._id,
          productName: product.name,
          quantity: item.quantity,
          unitPrice: product.price,
          subtotal: item.quantity * product.price,
        };
      })
    );

 
    const total = saleItems.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );

  
    await Promise.all(
      items.map(async (item) => {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      })
    );


    const updatedSale = await Sales.findByIdAndUpdate(
      id,
      {
        items: saleItems,
        paymentMethod,
        total,
      },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      message: "Venta actualizada correctamente",
      sale: updatedSale,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message || "Error al actualizar venta",
    });
  }
};

export { createSale, getOneSale, getSales,updateSale };
