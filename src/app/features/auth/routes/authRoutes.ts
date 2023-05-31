import { Router } from "express";
import createAccountController from "../controllers/createAccountController";
import logInController from "../controllers/logInController";

export const authRoutes = Router();
authRoutes.post("/signup", createAccountController); 
authRoutes.post("/login", logInController);