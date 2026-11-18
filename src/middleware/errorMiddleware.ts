import type { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/appError";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: err.status,
      message: req.t(err.message),
      ...(err.errors && { errors: err.errors }),
    });
  }
  return res.status(500).json({
    statusCode: 500,
    status: "error",
    message: req.t("auth:internalError"),
  });
};

export { errorMiddleware };
