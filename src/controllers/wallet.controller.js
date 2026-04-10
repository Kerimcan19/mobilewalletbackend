import { getWalletByUserId } from "../services/wallet.service.js";

export const getWallet = async (req, res) => {
  try {
    const wallet = await getWalletByUserId(req.user.userId);

    res.status(200).json({
      message: "Wallet bilgisi",
      data: wallet,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};