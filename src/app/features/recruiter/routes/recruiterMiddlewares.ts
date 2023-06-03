import { Router } from "express";
import authTokenMiddleware from "../../auth/validators/middlewares/authTokenMiddleware";
import validCreateJobInfos from "../validators/middlewares/validCreateJobInfos";
import validJobIdMiddleware from "../../../shared/validators/middlewares/validJobIdMiddleware";

export const recruiterMiddlewares = Router();

recruiterMiddlewares.post("/createjob", [authTokenMiddleware, validCreateJobInfos]);
recruiterMiddlewares.delete("/deletejob/:jobid", [authTokenMiddleware, validJobIdMiddleware]);
recruiterMiddlewares.get("/candidates/:jobid", [authTokenMiddleware, validJobIdMiddleware]);
recruiterMiddlewares.get("/createdjobs", [authTokenMiddleware]);
recruiterMiddlewares.put("/activatejob/:jobid", [authTokenMiddleware, validJobIdMiddleware]);
recruiterMiddlewares.put("/deactivatejob/:jobid", [authTokenMiddleware, validJobIdMiddleware]);
recruiterMiddlewares.put("/approveapplication/:jobid/:userid", [authTokenMiddleware, validJobIdMiddleware]);
recruiterMiddlewares.put("/refuseapplication/:jobid/:userid", [authTokenMiddleware, validJobIdMiddleware]);

