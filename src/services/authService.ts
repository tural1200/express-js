import { AppError } from "../lib";
import type { RegisterBody, LoginBody } from "../schemas/authSchema";
import { generateToken } from "../lib/generateToken";
import { decodeToken } from "../lib/decodeToken";
import { createResetToken, hashResetToken } from "../lib/resetToken";
import { hashPassword } from "../lib/hashPassword";
import { compare } from "../lib/compare";
import { UserRepository } from "../repositories/userRepository";
import { PasswordResetTokenRepository } from "../repositories/passwordResetTokenRepository";
import { EmailService } from "./emailService";

class AuthService {
  static async register(body: RegisterBody) {
    const { email, password, firstName, lastName, birthDate } = body;

    const userExists = await UserRepository.findByEmail(email);

    if (userExists) {
      throw AppError.badRequest("auth:userExists");
    }

    const hashedPassword = await hashPassword(password);

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

    if (!user) throw AppError.unauthorized("auth:invalidCredentials");

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid)
      throw AppError.unauthorized("auth:invalidCredentials");

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

    await EmailService.sendPasswordResetEmail(user.email, rawToken);
  }

  static async resetPassword(token: string, password: string) {
    const tokenHash = hashResetToken(token);
    const resetToken =
      await PasswordResetTokenRepository.findValidByHash(tokenHash);

    if (!resetToken) return null;

    const hashedPassword = await hashPassword(password);

    await PasswordResetTokenRepository.consumeAndUpdatePassword(
      resetToken.id,
      resetToken.userId,
      hashedPassword,
    );

    return true;
  }

  static async changePassword({
    userId,
    oldPassword,
    newPassword,
  }: {
    userId: string;
    oldPassword: string;
    newPassword: string;
  }) {
    const user = await UserRepository.findById(userId);

    if (!user) throw AppError.unauthorized();

    const isOldPasswordValid = await compare(oldPassword, user.password);

    if (!isOldPasswordValid) {
      throw AppError.unauthorized("auth:invalidOldPassword");
    }

    const newHashedPassword = await hashPassword(newPassword);

    await UserRepository.updatePassword(userId, newHashedPassword);

    return true;
  }
}

export { AuthService };
