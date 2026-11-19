import express from "express";
import {
  create,
  update,
  getAll,
  updateMe,
  deleteUser,
} from "../controllers/userController.ts";
import { authMiddleware } from "../middleware/authmiddleware.ts";
import { validationMiddleware } from "../middleware/validatationMiddleware.ts";
import {
  userSchema,
  updateUserSchema,
  updateMeSchema,
} from "../schemas/userSchema.ts";

const router = express.Router();

router.use("/", authMiddleware);

router.post("/", validationMiddleware(userSchema), create);

router.patch("/update", validationMiddleware(updateUserSchema), update);

router.patch("/me", validationMiddleware(updateMeSchema), updateMe);

router.get("/", getAll);

router.delete("/:id", deleteUser);

export default router;
