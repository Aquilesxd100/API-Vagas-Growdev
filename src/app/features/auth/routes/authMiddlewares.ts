import { Router } from "express";

export const authMiddlewares = Router();
authMiddlewares.post("/login", []);
authMiddlewares.post("/signup", []);