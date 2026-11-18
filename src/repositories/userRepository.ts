import { prisma } from "../../lib/prisma";
import type {
  UpdateUserRequestBody,
  UserRequestBody,
} from "../schemas/userSchema";

class UserRepository {
  static findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static create(body: UserRequestBody) {
    return prisma.user.create({ data: body });
  }

  static update(body: UpdateUserRequestBody) {
    return prisma.user.update({ where: { email: body.email }, data: body });
  }

  static updatePassword(userId: string, newPassword: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });
  }
}

export { UserRepository };
