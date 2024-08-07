import { Router } from "express";
import { addOrder, getOrders } from "./orders.controller";

const router = Router();

router.get('', getOrders);
router.post('', addOrder);

export default router;