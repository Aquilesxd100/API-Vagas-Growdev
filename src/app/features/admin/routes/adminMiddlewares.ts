import { Router } from "express";
import validSignUpInfosMiddleware from "../../../shared/validators/middlewares/validSignUpInfosMiddleware";
import authTokenMiddleware from "../../auth/validators/middlewares/authTokenMiddleware";

export const adminMiddlewares = Router();
adminMiddlewares.post("/newrecruiter", [authTokenMiddleware, validSignUpInfosMiddleware]);