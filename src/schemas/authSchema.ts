import { z } from "zod";
import { userSchema } from "./userSchema.ts";
import { passwordSchema } from "./passwordSchema.ts";

export const registerSchema = userSchema;

export const loginSchema = z.object({
  email: z.email({ message: "email" }),
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "email" }),
});

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwordMismatch",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "passwordMismatch",
    path: ["confirmNewPassword"],
  });

export type RegisterBody = z.infer<typeof registerSchema>;
export type LoginBody = z.infer<typeof loginSchema>;
export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordBody = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordBody = z.infer<typeof changePasswordSchema>;
