import { Router } from "express";
import { createSale ,getOneSale,getSales} from "../controllers/sales.controller.js";


const router = Router();


router.get("/sales/:id", getOneSale);
router.get("/sales", getSales);
router.post("/sales", createSale);


export default router;