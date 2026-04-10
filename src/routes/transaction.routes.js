import express from "express";
import {
  transfer,
  getTransactions,
} from "../controllers/transaction.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/transfer", authMiddleware, transfer);
router.get("/", authMiddleware, getTransactions);

export default router;