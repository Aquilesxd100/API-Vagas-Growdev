import { Router } from "express";
import createRecruiterController from "../controllers/createRecruiterController";

export const adminRoutes = Router();
adminRoutes.post("/newrecruiter", createRecruiterController);