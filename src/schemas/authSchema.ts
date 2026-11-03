import { z } from "zod";
import { userSchema } from "./userSchema.ts";

export const registerSchema = userSchema;

export const loginSchema = z.object({
  email: z.email({ message: "email" }),
  password: z
    .string()
    .min(8, "minLength")
    .max(128, "maxLength")
    .regex(/[A-Z]/, "passwordUppercase")
    .regex(/[a-z]/, "passwordLowercase")
    .regex(/[0-9]/, "passwordNumber"),
});

export type RegisterBody = z.infer<typeof registerSchema>;
export type LoginBody = z.infer<typeof loginSchema>;
