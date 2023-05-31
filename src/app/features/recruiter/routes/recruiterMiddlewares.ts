import { Router } from "express";

export const recruiterMiddlewares = Router();

recruiterMiddlewares.post("/createjob", []);
recruiterMiddlewares.delete("/deletejob/:jobid", []);
recruiterMiddlewares.get("/candidates/:jobid", []);
recruiterMiddlewares.get("/createdjobs", []);
recruiterMiddlewares.put("/activatejob/:jobid", []);
recruiterMiddlewares.put("/desactivatejob/:jobid", []);

