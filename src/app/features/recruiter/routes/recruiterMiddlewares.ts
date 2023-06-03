import { Router } from "express";
import authTokenMiddleware from "../../auth/validators/middlewares/authTokenMiddleware";
import validCreateJobInfos from "../validators/middlewares/validCreateJobInfos";

export const recruiterMiddlewares = Router();

recruiterMiddlewares.post("/createjob", [authTokenMiddleware, validCreateJobInfos]);
recruiterMiddlewares.delete("/deletejob/:jobid", [authTokenMiddleware]);
recruiterMiddlewares.get("/candidates/:jobid", [authTokenMiddleware]);
recruiterMiddlewares.get("/createdjobs", [authTokenMiddleware]);
recruiterMiddlewares.put("/activatejob/:jobid", [authTokenMiddleware]);
recruiterMiddlewares.put("/deactivatejob/:jobid", [authTokenMiddleware]);
recruiterMiddlewares.put("/approveapplication/jobId/userId", [authTokenMiddleware]);
recruiterMiddlewares.put("/refuseapplication/jobId/userId", [authTokenMiddleware]);

