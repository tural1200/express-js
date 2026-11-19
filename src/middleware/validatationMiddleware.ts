// src/middleware/validate.ts
import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { AppError } from "../lib/appError.ts";

const capitalizeSentence = (message: string, lng?: string) =>
  message.charAt(0).toLocaleUpperCase(lng) + message.slice(1);

const validationMiddleware =
  (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body ?? {});
    if (!result.success) {
      const errors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const field = issue.path.join(".") || "body";

        if (errors[field]) {
          continue;
        }

        const lng = req.language;
        const key =
          issue.code === "invalid_type" ? "required" : issue.message;

        const message = req.t(key, {
          ...issue,
          lng,
          field: req.t(field, { ns: "fields", lng, defaultValue: field }),
        });

        errors[field] = capitalizeSentence(message, lng);
      }

      throw AppError.validation(errors);
    }
    req.body = result.data;
    next();
  };

export { validationMiddleware };
