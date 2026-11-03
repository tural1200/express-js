import { Response } from "express";
import { HTTP_STATUS_CODES } from "../constants";

interface Payload<T> {
  data?: T;
  message?: string;
}

class AppResponse {
  private static send<T>(
    res: Response,
    statusCode: number,
    { data, message }: Payload<T>,
  ) {
    return res.status(statusCode).json({
      statusCode,
      status: "success",
      ...(message && { message }),
      ...(data !== undefined && { data }),
    });
  }

  static success<T>(res: Response, payload: Payload<T>) {
    return AppResponse.send(res, HTTP_STATUS_CODES.OK, payload);
  }

  static created<T>(res: Response, payload: Payload<T> = {}) {
    return AppResponse.send(res, HTTP_STATUS_CODES.CREATED, payload);
  }
}

export { AppResponse };
