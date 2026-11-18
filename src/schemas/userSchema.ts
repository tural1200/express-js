import { z } from "zod";
import { passwordSchema } from "./passwordSchema.ts";

export const userSchema = z.object({
  firstName: z.string().trim().min(1).max(50),
  lastName: z.string().trim().min(1).max(50),
  email: z.email(),
  password: passwordSchema,
  birthDate: z.iso.date(),
});

export const updateUserSchema = userSchema.omit({ password: true });

export const updateMeSchema = userSchema.omit({ password: true, email: true });

export type UserRequestBody = z.infer<typeof userSchema>;

export type UpdateUserRequestBody = z.infer<typeof updateUserSchema>;

export type UpdateMeRequestBody = z.infer<typeof updateMeSchema>;
