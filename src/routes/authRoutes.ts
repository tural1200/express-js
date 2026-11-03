import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.ts";
import { validationMiddleware } from "../middleware/validatationMiddleware.ts";
import { loginSchema, registerSchema } from "../schemas/authSchema.ts";
import { forgotPasswordSchema } from "../schemas/forgotPasswordSchema.ts";
import resetPasswordSchema from "../schemas/resetPasswordSchema.ts";

const router = express.Router();

router.post("/register", validationMiddleware(registerSchema), register);
router.post("/login", validationMiddleware(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", getProfile);
router.post(
  "/forgot-password",
  validationMiddleware(forgotPasswordSchema),
  forgotPassword,
);
router.post(
  "/reset-password",
  validationMiddleware(resetPasswordSchema),
  resetPassword,
);

export default router;
