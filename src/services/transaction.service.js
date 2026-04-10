import prisma from "../config/prisma.js";

export const transferMoney = async (senderUserId, receiverEmail, amount) => {
  if (amount <= 0) {
    throw new Error("Geçersiz tutar");
  }

  return await prisma.$transaction(async (tx) => {

    // 1. sender wallet
    const senderWallet = await tx.wallet.findUnique({
      where: { userId: senderUserId },
    });

    if (!senderWallet) throw new Error("Sender wallet bulunamadı");

    if (senderWallet.balance < amount)
      throw new Error("Yetersiz bakiye");

    // 2. receiver
    const receiverUser = await tx.user.findUnique({
      where: { email: receiverEmail },
      include: { wallet: true },
    });

    if (!receiverUser) throw new Error("Alıcı bulunamadı");

    if (!receiverUser.wallet)
      throw new Error("Alıcı wallet bulunamadı");

    const receiverWallet = receiverUser.wallet;

    // 3. update balances
    const updatedSender = await tx.wallet.update({
      where: { id: senderWallet.id },
      data: { balance: senderWallet.balance - amount },
    });

    const updatedReceiver = await tx.wallet.update({
      where: { id: receiverWallet.id },
      data: { balance: receiverWallet.balance + amount },
    });

    // 4. transaction
    const transaction = await tx.transaction.create({
      data: {
        amount,
        senderId: senderWallet.id,
        receiverId: receiverWallet.id,
        type: "TRANSFER",
        status: "SUCCESS",
      },
    });

    // 5. audit log
    await tx.auditLog.create({
      data: {
        userId: senderUserId,
        action: "TRANSFER",
        meta: {
          to: receiverEmail,
          receiverId: receiverUser.id,
          amount,
          transactionId: transaction.id,
        },
      },
    });

    return {
      transaction,
      senderBalance: updatedSender.balance,
      receiverBalance: updatedReceiver.balance,
    };
  });
};
export const getUserTransactions = async (userId) => {
  const wallet = await prisma.wallet.findUnique({
    where: { userId },
  });

  if (!wallet) {
    throw new Error("Wallet bulunamadı");
  }

  return await prisma.transaction.findMany({
    where: {
      OR: [
        { senderId: wallet.id },
        { receiverId: wallet.id },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};