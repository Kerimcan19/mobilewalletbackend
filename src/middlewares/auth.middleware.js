import jwt from "jsonwebtoken";
import { getJwtSecret } from "../config/env.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token yok" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Geçersiz token formatı" });
    }

    const decoded = jwt.verify(
      token,
      getJwtSecret()
    );

    req.user = decoded; // userId burada

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Yetkisiz erişim",
    });
  }
};