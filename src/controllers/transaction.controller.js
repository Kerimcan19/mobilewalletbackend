import {
  transferMoney,
  getUserTransactions,
} from "../services/transaction.service.js";

export const transfer = async (req, res) => {
  try {
    const { receiverEmail, amount } = req.body;

    const result = await transferMoney(
      req.user.userId,
      receiverEmail,
      Number(amount)
    );

    res.status(200).json({
      message: "Transfer başarılı",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const data = await getUserTransactions(req.user.userId);

    res.status(200).json({
      message: "Transaction listesi",
      data,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};