import prisma from "../config/prisma.js";

export const addBalance = async (userId, amount) => {
  const wallet = await prisma.wallet.findUnique({
    where: { userId },
  });

  if (!wallet) throw new Error("Wallet yok");

  const updated = await prisma.wallet.update({
    where: { userId },
    data: {
      balance: wallet.balance + amount,
    },
  });

  return updated;
};