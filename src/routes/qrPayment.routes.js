import express from "express";
import { payQR } from "../controllers/qrPayment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/pay", authMiddleware, payQR);

export default router;