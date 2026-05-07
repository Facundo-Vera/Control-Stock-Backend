import Router from 'express';
import { createProduct } from '../controllers/product.controller.js';
import { validateCreateProduct } from '../middlewares/product.validator.js';


const router = Router();

router.post('/products',validateCreateProduct, createProduct)

export default router;