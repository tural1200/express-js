import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().trim().min(1).max(50),
  lastName: z.string().trim().min(1).max(50),
  email: z.email(),
  password: z
    .string()
    .min(8, "minLength")
    .max(128, "maxLength")
    .regex(/[A-Z]/, "passwordUppercase")
    .regex(/[a-z]/, "passwordLowercase")
    .regex(/[0-9]/, "passwordNumber"),
  birthDate: z.iso.date(),
});

export type UserRequestBody = z.infer<typeof userSchema>;
