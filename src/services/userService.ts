import type {
  UpdateUserRequestBody,
  UserRequestBody,
} from "../schemas/userSchema";
import { UserRepository } from "../repositories/userRepository";
import { AppError } from "../lib";

class UserService {
  static async create(body: UserRequestBody) {
    const { firstName, lastName, email, birthDate, password } = body;

    const userExists = await UserRepository.findByEmail(email);

    if (userExists) throw AppError.badRequest("auth:userExists");

    const user = await UserRepository.create({
      firstName,
      lastName,
      email,
      birthDate,
      password,
    });

    return user;
  }

  static async update(body: UpdateUserRequestBody) {
    const { email } = body;

    const user = await UserRepository.findByEmail(email);

    if (!user) throw AppError.badRequest("auth:userNotFound");

    const updatedUser = await UserRepository.update(body);

    return {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      birthDate: updatedUser.birthDate,
    };
  }
}

export { UserService };
