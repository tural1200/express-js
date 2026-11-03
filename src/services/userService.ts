import type { UserRequestBody } from "../schemas/userSchema";
import { UserRepository } from "../repositories/userRepository";
import { AppError } from "../lib";

class UserService {
  static async create(body: UserRequestBody) {
    const { firstName, lastName, email, birthDate, password } = body;

    const userExists = await UserRepository.findByEmail(email);

    if (userExists) throw AppError.badRequest("This user already exist!");

    const user = await UserRepository.create({
      firstName,
      lastName,
      email,
      birthDate,
      password,
    });

    return user;
  }
}

export { UserService };
