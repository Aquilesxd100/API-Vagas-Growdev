import { Router } from "express";
import applyForJobController from "../controllers/applyForJobController";
import getApplicationsController from "../controllers/getApplicationsController";

export const candidateRoutes = Router();

candidateRoutes.post("/apply/:jobid", applyForJobController);
candidateRoutes.get("/applications", getApplicationsController);