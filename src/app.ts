import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { i18next, middleware } from "../i18n";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(middleware.handle(i18next));

export default app;
