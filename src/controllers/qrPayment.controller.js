import { payFromQR } from "../services/qrPayment.service.js";

export const payQR = async (req, res) => {
  try {
    const { qrData } = req.body;

    const result = await payFromQR(
      req.user.userId,
      qrData
    );

    res.status(200).json({
      message: "QR ödeme başarılı",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};