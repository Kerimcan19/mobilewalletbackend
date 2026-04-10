import express from "express";
import { topUp } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/topup", topUp);

export default router;