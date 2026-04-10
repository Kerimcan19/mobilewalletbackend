import { addBalance } from "../services/admin.service.js";

export const topUp = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const result = await addBalance(userId, Number(amount));

    res.status(200).json({
      message: "Bakiye eklendi",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};