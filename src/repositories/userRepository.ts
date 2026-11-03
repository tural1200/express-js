import { prisma } from "../../lib/prisma";
import type { UserRequestBody } from "../schemas/userSchema";

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
}

export { UserRepository };
