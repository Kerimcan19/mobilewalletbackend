import prisma from "../config/prisma.js";

export const getWalletByUserId = async (userId) => {
  const wallet = await prisma.wallet.findUnique({
    where: { userId },
  });

  if (!wallet) {
    throw new Error("Wallet bulunamadı");
  }

  return wallet;
};