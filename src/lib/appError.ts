import { MESSAGES, HTTP_STATUS_CODES } from "../constants";

class AppError extends Error {
  statusCode: number;
  status: "fail" | "error";
  errors?: { field: string; message: string }[];

  constructor({
    statusCode,
    message,
    status = statusCode >= 500 ? "error" : "fail",
  }: {
    statusCode: number;
    message: string;
    status?: "fail" | "error";
  }) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.status = status;
  }

  static badRequest(message?: string) {
    return new AppError({
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: message ?? MESSAGES.BAD_REQUEST,
    });
  }

  static unauthorized(message?: string) {
    return new AppError({
      statusCode: HTTP_STATUS_CODES.UNAUTHORIZED,
      message: message ?? MESSAGES.UNAUTHORIZED,
    });
  }

  static forbidden(message?: string) {
    return new AppError({
      statusCode: HTTP_STATUS_CODES.FORBIDDEN,
      message: message ?? MESSAGES.FORBIDDEN,
    });
  }

  static notFound(message?: string) {
    return new AppError({
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      message: message ?? MESSAGES.NOT_FOUND,
    });
  }

  static validation(errors: { field: string; message: string }[]) {
    const err = new AppError({
      statusCode: HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY,
      message: MESSAGES.VALIDATION_FAILED,
    });
    err.errors = errors;
    return err;
  }
}

export { AppError };
