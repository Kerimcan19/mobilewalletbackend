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

// 1. APP OLUŞTUR
const app = express();

// 2. MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(apiLimiter);


// 3. ROUTES
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

// 4. HTTP SERVER
const server = http.createServer(app);

// 5. SOCKET.IO
export const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

// 6. START SERVER (TEK YERDEN)
const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});