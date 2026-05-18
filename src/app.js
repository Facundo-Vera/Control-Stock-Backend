import "dotenv/config";
import express from "express";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", salesRoutes);
app.use("/api", authRoutes);

export default app;
