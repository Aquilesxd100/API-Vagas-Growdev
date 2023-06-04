import { Router } from "express";
import validSignUpInfosMiddleware from "../../../shared/validators/middlewares/validSignUpInfosMiddleware";
import authTokenMiddleware from "../../auth/validators/middlewares/authTokenMiddleware";
import authAdminUserTypeMiddleware from "../../auth/validators/middlewares/authAdminUserTypeMiddleware";

export const adminMiddlewares = Router();
adminMiddlewares.post("/newrecruiter", [authTokenMiddleware, authAdminUserTypeMiddleware, validSignUpInfosMiddleware]);