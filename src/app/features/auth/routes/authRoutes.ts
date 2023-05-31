import { Router } from "express";
import createAccountController from "../controllers/createAccountController";

export const authRoutes = Router();
authRoutes.post("/signup", createAccountController); 
authRoutes.post("/login", []);