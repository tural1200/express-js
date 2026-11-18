import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "minLength")
  .max(128, "maxLength")
  .regex(/[A-Z]/, "passwordUppercase")
  .regex(/[a-z]/, "passwordLowercase")
  .regex(/[0-9]/, "passwordNumber");
