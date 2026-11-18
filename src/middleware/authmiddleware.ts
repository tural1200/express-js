import type { NextFunction, Request, Response } from "express";
import { decodeToken } from "../lib/decodeToken.ts";
import { AppError } from "../lib/appError.ts";
import { UserRepository } from "../repositories/userRepository.ts";

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.cookies?.jwt) throw AppError.unauthorized();

  try {
    const decoded = decodeToken(req.cookies.jwt);
    const user = await UserRepository.findById(decoded.id);

    if (!user) {
      throw AppError.unauthorized();
    }
    const { password: _, ...safeUser } = user;
    req.user = safeUser;
    next();
  } catch {
    throw AppError.unauthorized();
  }
};

export { authMiddleware };
