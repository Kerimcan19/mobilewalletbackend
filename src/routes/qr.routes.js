import express from "express";
import { createQR } from "../controllers/qr.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createQR);

export default router;