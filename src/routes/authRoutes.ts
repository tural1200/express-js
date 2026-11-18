import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/authController.ts";
import { validationMiddleware } from "../middleware/validatationMiddleware.ts";
import { authMiddleware } from "../middleware/authmiddleware.ts";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schemas/authSchema.ts";

const router = express.Router();

router.post("/register", validationMiddleware(registerSchema), register);
router.post("/login", validationMiddleware(loginSchema), login);
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

router.use(authMiddleware);

router.post("/logout", logout);
router.get("/profile", getProfile);

router.put(
  "/change-password",
  validationMiddleware(changePasswordSchema),
  changePassword,
);

export default router;
