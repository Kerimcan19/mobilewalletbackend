import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 dakika
  max: 30, // 1 dakikada 30 istek
  message: "Çok fazla istek attın, biraz bekle",
});