import type { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { decodeToken } from "../lib/decodeToken.ts";
import { AppError } from "../lib/appError.ts";

interface AuthRequest {
  user: {};
}

const authMiddleware = async (
  req: Request<AuthRequest>,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.cookies?.jwt) throw AppError.unauthorized();

  try {
    const decoded = decodeToken(req.cookies.jwt);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw AppError.unauthorized();
    }
    req.user = user;
    next();
  } catch {
    throw AppError.unauthorized();
  }
};

export { authMiddleware };
