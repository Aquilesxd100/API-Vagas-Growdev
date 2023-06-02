import { Router } from "express";
import applyForJobController from "../controllers/applyForJobController";

export const candidateRoutes = Router();

candidateRoutes.post("/apply/:jobid", applyForJobController);
candidateRoutes.get("/applications", []);