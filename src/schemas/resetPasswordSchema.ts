import { z } from "zod";

const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: z
      .string()
      .min(8, "minLength")
      .max(128, "maxLength")
      .regex(/[A-Z]/, "passwordUppercase")
      .regex(/[a-z]/, "passwordLowercase")
      .regex(/[0-9]/, "passwordNumber"),
    confirmPassword: z
      .string()
      .min(8, "minLength")
      .max(128, "maxLength")
      .regex(/[A-Z]/, "passwordUppercase")
      .regex(/[a-z]/, "passwordLowercase")
      .regex(/[0-9]/, "passwordNumber"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwordMismatch",
    path: ["confirmPassword"],
  });

export default resetPasswordSchema;
