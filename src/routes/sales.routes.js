import { Router } from "express";
import { createSale ,getOneSale,getSales, updateSale} from "../controllers/sales.controller.js";
import { authenticate } from "../middlewares/auth.validator.js";


const router = Router();


router.get("/sales/:id",authenticate, getOneSale);
router.get("/sales",authenticate, getSales);
router.post("/sales",authenticate , createSale);
router.put("/sales/:id", authenticate, updateSale);


export default router;