import express from "express";
import { create, getAll } from "../controllers/userController.ts";
import { authMiddleware } from "../middleware/authmiddleware.ts";
import { validationMiddleware } from "../middleware/validatationMiddleware.ts";
import { userSchema } from "../schemas/userSchema.ts";

const router = express.Router();

router.use("/", authMiddleware);

router.post("/", validationMiddleware(userSchema), create);

router.get("/", getAll);

export default router;
