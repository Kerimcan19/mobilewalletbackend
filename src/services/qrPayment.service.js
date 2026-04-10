import prisma from "../config/prisma.js";
import { transferMoney } from "./transaction.service.js";

export const payFromQR = async (senderUserId, qrData) => {
  const { userId: receiverUserId, amount } = qrData;

  if (!receiverUserId) {
    throw new Error("QR geçersiz");
  }

  // receiver email bulmak yerine direkt userId kullanacağız
  const receiverUser = await prisma.user.findUnique({
    where: { id: receiverUserId },
  });

  if (!receiverUser) {
    throw new Error("Alıcı bulunamadı");
  }

  // transferMoney email ile yazmıştık → şimdi uyarlıyoruz
  return await prisma.$transaction(async (tx) => {
    const senderWallet = await tx.wallet.findUnique({
      where: { userId: senderUserId },
    });

    if (!senderWallet) throw new Error("Sender wallet yok");

    if (senderWallet.balance < amount)
      throw new Error("Yetersiz bakiye");

    const receiverWallet = await tx.wallet.findUnique({
      where: { userId: receiverUserId },
    });

    if (!receiverWallet) throw new Error("Receiver wallet yok");

    const updatedSender = await tx.wallet.update({
      where: { id: senderWallet.id },
      data: { balance: senderWallet.balance - amount },
    });

    const updatedReceiver = await tx.wallet.update({
      where: { id: receiverWallet.id },
      data: { balance: receiverWallet.balance + amount },
    });

    const transaction = await tx.transaction.create({
      data: {
        amount,
        senderId: senderWallet.id,
        receiverId: receiverWallet.id,
        type: "TRANSFER",
        status: "SUCCESS",
      },
    });

    return {
      transaction,
      senderBalance: updatedSender.balance,
      receiverBalance: updatedReceiver.balance,
    };
  });
};