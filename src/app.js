import "./config/env.js";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.routes.js";
import walletRoutes from "./routes/wallet.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import qrRoutes from "./routes/qr.routes.js";
import qrPaymentRoutes from "./routes/qrPayment.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import { apiLimiter } from "./middlewares/rateLimit.middleware.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(apiLimiter);

app.get("/", (req, res) => {
  res.send("Wallet API çalışıyor 🚀");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/qr-payment", qrPaymentRoutes);
app.use("/api/admin", adminRoutes);

export default app;

export let io = null;
export let server = null;

if (!process.env.VERCEL) {
  server = http.createServer(app);
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  });

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}