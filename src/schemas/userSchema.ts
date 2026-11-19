import { z } from "zod";
import { passwordSchema } from "./passwordSchema.ts";

export const userSchema = z.object({
  firstName: z.string().trim().min(1, "required").max(50, "maxLength"),
  lastName: z.string().trim().min(1, "required").max(50, "maxLength"),
  email: z
    .string()
    .trim()
    .min(1, "required")
    .pipe(z.email({ message: "email" })),
  password: passwordSchema,
  birthDate: z
    .string()
    .trim()
    .min(1, "required")
    .pipe(z.iso.date({ message: "date" })),
});

export const updateUserSchema = userSchema.omit({ password: true });

export const updateMeSchema = userSchema.omit({ password: true, email: true });

export type UserRequestBody = z.infer<typeof userSchema>;

export type UpdateUserRequestBody = z.infer<typeof updateUserSchema>;

export type UpdateMeRequestBody = z.infer<typeof updateMeSchema>;
