import { generateQR } from "../services/qr.service.js";

export const createQR = async (req, res) => {
  try {
    const { amount } = req.body;

    const qr = await generateQR(req.user.userId, amount);

    res.status(200).json({
      message: "QR oluşturuldu",
      data: qr,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};