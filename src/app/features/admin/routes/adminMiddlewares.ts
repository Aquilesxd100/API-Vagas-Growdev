import { Router } from "express";
import validSignUpInfosMiddleware from "../../../shared/validators/middlewares/validSignUpInfosMiddleware";

export const adminMiddlewares = Router();
adminMiddlewares.post("/newrecruiter", validSignUpInfosMiddleware);