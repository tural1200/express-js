import type {
  UpdateUserRequestBody,
  UserRequestBody,
} from "../schemas/userSchema";
import { UserRepository } from "../repositories/userRepository";
import { AppError } from "../lib";
import { hashPassword } from "../lib/hashPassword";

class UserService {
  static async create(body: UserRequestBody, createdById: string) {
    const { firstName, lastName, email, birthDate, password } = body;

    const userExists = await UserRepository.existsByEmail(email);

    if (userExists) throw AppError.badRequest("auth:userExists");

    const hashedPassword = await hashPassword(password);

    const user = await UserRepository.create({
      firstName,
      lastName,
      email,
      birthDate,
      password: hashedPassword,
      createdById,
    });

    return user;
  }

  static async update(body: UpdateUserRequestBody, updatedById: string) {
    const { email } = body;

    const user = await UserRepository.findByEmail(email);

    if (!user) throw AppError.badRequest("auth:userNotFound");

    const updatedUser = await UserRepository.update({
      ...body,
      updatedById,
      updatedAt: new Date(),
    });

    return {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      birthDate: updatedUser.birthDate,
    };
  }

  static async getAll() {
    const users = await UserRepository.findAll();

    return {
      users,
      totalCount: users.length,
    };
  }

  static async delete(id: string, deletedById: string) {
    const user = await UserRepository.findById(id);

    if (!user) throw AppError.badRequest("auth:userNotFound");

    await UserRepository.delete(id, deletedById);
  }
}

export { UserService };
