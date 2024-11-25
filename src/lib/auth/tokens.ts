import { randomBytes } from "crypto";
import { VetFlowError } from "../errors/VetFlowError";
import { ErrorCode } from "../errors/types";
import { prisma } from "../prisma/client";

const TOKEN_EXPIRY = {
  VERIFICATION: 24 * 60 * 60 * 1000, // 24 hours
  RESET: 1 * 60 * 60 * 1000, // 1 hour
};

export async function generateVerificationToken(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + TOKEN_EXPIRY.VERIFICATION);

  const existingToken = await prisma.verificationToken.findFirst({
    where: { userId }
  });

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id }
    });
  }

  return prisma.verificationToken.create({
    data: {
      token,
      userId,
      expires,
    }
  });
}

export async function verifyEmail(token: string) {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!verificationToken) {
    throw new VetFlowError(
      ErrorCode.INVALID_INPUT,
      "Invalid verification token"
    );
  }

  if (verificationToken.expires < new Date()) {
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id }
    });
    throw new VetFlowError(
      ErrorCode.INVALID_INPUT,
      "Verification token has expired"
    );
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerified: new Date() }
    }),
    prisma.verificationToken.delete({
      where: { id: verificationToken.id }
    })
  ]);

  return verificationToken.user;
}

export async function generatePasswordResetToken(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + TOKEN_EXPIRY.RESET);

  const existingToken = await prisma.resetToken.findFirst({
    where: { userId }
  });

  if (existingToken) {
    await prisma.resetToken.delete({
      where: { id: existingToken.id }
    });
  }

  return prisma.resetToken.create({
    data: {
      token,
      userId,
      expires,
    }
  });
}

export async function validateResetToken(token: string) {
  const resetToken = await prisma.resetToken.findUnique({
    where: { token }
  });

  if (!resetToken) {
    throw new VetFlowError(
      ErrorCode.INVALID_INPUT,
      "Invalid reset token"
    );
  }

  if (resetToken.expires < new Date()) {
    await prisma.resetToken.delete({
      where: { id: resetToken.id }
    });
    throw new VetFlowError(
      ErrorCode.INVALID_INPUT,
      "Reset token has expired"
    );
  }

  return resetToken;
}

export async function deleteResetToken(id: string) {
  return prisma.resetToken.delete({
    where: { id }
  });
}
