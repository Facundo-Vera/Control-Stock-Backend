import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";



import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();



app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", salesRoutes);
app.use("/api", authRoutes);

export default app;
