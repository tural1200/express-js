import bcrypt from "bcrypt";
import { AppError } from "../lib";
import type { RegisterBody, LoginBody } from "../schemas/authSchema";
import { generateToken } from "../lib/generateToken";
import { decodeToken } from "../lib/decodeToken";
import { createResetToken, hashResetToken } from "../lib/resetToken";
import { UserRepository } from "../repositories/userRepository";
import { PasswordResetTokenRepository } from "../repositories/passwordResetTokenRepository";

class AuthService {
  static async register(body: RegisterBody) {
    const { email, password, firstName, lastName, birthDate } = body;

    const userExists = await UserRepository.findByEmail(email);

    if (userExists) {
      throw AppError.badRequest("This user already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      birthDate,
    });
    return user;
  }

  static async login(body: LoginBody) {
    const { email, password } = body;
    const user = await UserRepository.findByEmail(email);

    if (!user) throw AppError.unauthorized("Invalid email or password.");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw AppError.unauthorized("Invalid email or password.");

    const token = generateToken(user.id);

    return { user, token };
  }

  static async getProfile(jwt: string) {
    const decoded = decodeToken(jwt);

    const user = await UserRepository.findById(decoded.id);

    return user;
  }

  static async forgotPassword(email: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user) return;

    const since = new Date(Date.now() - 60 * 60 * 1000);
    const recentCount = await PasswordResetTokenRepository.countRecentByUserId(
      user.id,
      since,
    );

    if (recentCount >= 3) return;

    const { rawToken, hashedToken } = createResetToken();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await PasswordResetTokenRepository.invalidateActiveAndCreate(
      user.id,
      hashedToken,
      expiresAt,
    );

    //TODO: update this with real email service
    console.log(rawToken);
  }

  static async resetPassword(token: string, password: string) {
    const tokenHash = hashResetToken(token);
    const resetToken =
      await PasswordResetTokenRepository.findValidByHash(tokenHash);

    if (!resetToken) return null;

    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10),
    );

    await PasswordResetTokenRepository.consumeAndUpdatePassword(
      resetToken.id,
      resetToken.userId,
      hashedPassword,
    );

    return true;
  }
}

export { AuthService };
