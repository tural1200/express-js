import type { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/appError";

const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: err.status,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  }
  return res.status(500).json({
    statusCode: 500,
    status: "error",
    message: "An error occurred. Please contact administrator.",
  });
};

export { errorMiddleware };
