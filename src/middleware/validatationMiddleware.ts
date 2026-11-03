// src/middleware/validate.ts
import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { AppError } from "../lib/appError.ts";

const validationMiddleware =
  (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body ?? {});
    if (!result.success) {
      throw AppError.validation(
        result.error.issues.map((issue) => {
          const field = issue.path.join(".") || "body";
          const lng = req.language;
          const key =
            issue.code === "invalid_type" ? "required" : issue.message;
          return {
            field,
            message: req.t(key, {
              ...issue,
              lng,
              field: req.t(field, { ns: "fields", lng, defaultValue: field }),
            }),
          };
        }),
      );
    }
    req.body = result.data;
    next();
  };

export { validationMiddleware };
