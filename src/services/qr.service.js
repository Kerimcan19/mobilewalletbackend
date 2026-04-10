import QRCode from "qrcode";

export const generateQR = async (userId, amount = null) => {
  const payload = JSON.stringify({
    userId,
    amount,
  });

  const qr = await QRCode.toDataURL(payload);

  return qr;
};