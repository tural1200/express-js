import type { NextFunction, Request, Response } from "express";
import app from "./app.ts";
const PORT = process.env.PORT || 3000;
import authRoutes from "./routes/authRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import { errorMiddleware } from "./middleware/errorMiddleware.ts";

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
