import { prisma } from "../../lib/prisma";
import type {
  UpdateUserRequestBody,
  UserRequestBody,
} from "../schemas/userSchema";

class UserRepository {
  static findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
  }

  static findById(id: string) {
    return prisma.user.findFirst({
      where: { id, deletedAt: null },
    });
  }

  static existsByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email },
      select: { id: true },
    });
  }

  static findAll() {
    return prisma.user.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        birthDate: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static create(data: UserRequestBody & { createdById?: string | null }) {
    return prisma.user.create({ data });
  }

  static update(
    data: UpdateUserRequestBody & {
      updatedById: string;
      updatedAt: Date;
    },
  ) {
    const { email, ...rest } = data;
    return prisma.user.update({
      where: { email },
      data: rest,
    });
  }

  static updatePassword(userId: string, newPassword: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });
  }

  static delete(id: string, deletedById: string) {
    return prisma.user.update({
      where: { id },
      data: {
        deletedById,
        deletedAt: new Date(),
        updatedById: deletedById,
        updatedAt: new Date(),
      },
    });
  }
}

export { UserRepository };
