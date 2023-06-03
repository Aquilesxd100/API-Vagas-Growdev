import { Router } from "express";
import createJobController from "../controllers/createJobController";

export const recruiterRoutes = Router();

recruiterRoutes.post("/createjob", createJobController);
recruiterRoutes.delete("/deletejob/:jobid", []);
recruiterRoutes.get("/candidates/:jobid", []);
recruiterRoutes.get("/createdjobs", []);
recruiterRoutes.put("/activatejob/:jobid", []);
recruiterRoutes.put("/deactivatejob/:jobid", []);
recruiterRoutes.put("/approveapplication/jobId/userId", []);
recruiterRoutes.put("/refuseapplication/jobId/userId", []);