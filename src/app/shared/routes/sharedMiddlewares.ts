import { Router } from "express";

export const sharedMiddlewares = Router();
sharedMiddlewares.get("/jobs", []);
