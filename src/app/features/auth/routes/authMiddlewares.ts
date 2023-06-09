import { Router } from "express";
import validSignUpInfosMiddleware from "../../../shared/validators/middlewares/validSignUpInfosMiddleware";
import validLoginInfosMiddleware from "../validators/middlewares/validLoginInfosMiddleware";

export const authMiddlewares = Router();
authMiddlewares.post("/signup", validSignUpInfosMiddleware);
authMiddlewares.post("/login", validLoginInfosMiddleware);