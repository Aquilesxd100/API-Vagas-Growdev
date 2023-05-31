import { Router } from "express";
import validSignUpInfosMiddleware from "../validators/middlewares/validSignUpInfosMiddleware";

export const authMiddlewares = Router();
authMiddlewares.post("/signup", validSignUpInfosMiddleware);
authMiddlewares.post("/login", []);