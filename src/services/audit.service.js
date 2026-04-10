import prisma from "../config/prisma.js";

export const createLog = async (userId, action, meta = {}) => {
  return await prisma.auditLog.create({
    data: {
      userId,
      action,
      meta,
    },
  });
};