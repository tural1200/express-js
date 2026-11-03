import { prisma } from "../../lib/prisma";

class PasswordResetTokenRepository {
  static countRecentByUserId(userId: string, since: Date) {
    return prisma.passwordResetToken.count({
      where: { userId, createedAt: { gt: since } },
    });
  }

  static invalidateActiveAndCreate(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ) {
    return prisma.$transaction([
      prisma.passwordResetToken.updateMany({
        where: { userId, usedAt: null },
        data: { usedAt: new Date() },
      }),
      prisma.passwordResetToken.create({
        data: { userId, tokenHash, expiresAt },
      }),
    ]);
  }

  static findValidByHash(tokenHash: string) {
    return prisma.passwordResetToken.findFirst({
      where: { tokenHash, usedAt: null, expiresAt: { gt: new Date() } },
    });
  }

  static consumeAndUpdatePassword(
    tokenId: string,
    userId: string,
    hashedPassword: string,
  ) {
    return prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.update({
        where: { id: tokenId },
        data: { usedAt: new Date() },
      }),
    ]);
  }
}

export { PasswordResetTokenRepository };
