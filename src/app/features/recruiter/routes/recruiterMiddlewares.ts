import { Router } from "express";

export const recruiterMiddlewares = Router();

recruiterMiddlewares.post("/createjob", []);
recruiterMiddlewares.delete("/deletejob/:jobid", []);
recruiterMiddlewares.get("/candidates/:jobid", []);
recruiterMiddlewares.get("/createdjobs", []);
recruiterMiddlewares.put("/activatejob/:jobid", []);
recruiterMiddlewares.put("/desactivatejob/:jobid", []);
recruiterMiddlewares.put("/approveapplication/jobId/userId", []);
recruiterMiddlewares.put("/refuseapplication/jobId/userId", []);

