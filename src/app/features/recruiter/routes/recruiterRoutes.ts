import { Router } from "express";

export const recruiterRoutes = Router();

recruiterRoutes.post("/createjob", []);
recruiterRoutes.delete("/deletejob/:jobid", []);
recruiterRoutes.get("/candidates/:jobid", []);
recruiterRoutes.get("/createdjobs", []);
recruiterRoutes.put("/activatejob/:jobid", []);
recruiterRoutes.put("/desactivatejob/:jobid", []);