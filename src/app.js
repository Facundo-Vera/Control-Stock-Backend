import "dotenv/config";
import express from 'express';
import productRoutes from './routes/product.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api', productRoutes);


export default app;