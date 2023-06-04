import { Router } from "express";
import authTokenMiddleware from "../../auth/validators/middlewares/authTokenMiddleware";
import validCreateJobInfos from "../validators/middlewares/validCreateJobInfos";
import validJobIdMiddleware from "../../../shared/validators/middlewares/validJobIdMiddleware";
import validCandidateIdMiddleware from "../validators/middlewares/validCandidateIdMiddleware";
import authRecruiterUserTypeMiddleware from "../../auth/validators/middlewares/authRecruiterUserTypeMiddleware";

export const recruiterMiddlewares = Router();

recruiterMiddlewares.post("/createjob", [authTokenMiddleware, authRecruiterUserTypeMiddleware, validCreateJobInfos]);
recruiterMiddlewares.delete("/deletejob/:jobid", [authTokenMiddleware, authRecruiterUserTypeMiddleware, validJobIdMiddleware]);
recruiterMiddlewares.get("/candidates/:jobid", [authTokenMiddleware, authRecruiterUserTypeMiddleware, validJobIdMiddleware]);
recruiterMiddlewares.get("/createdjobs", [authTokenMiddleware]);
recruiterMiddlewares.put("/activatejob/:jobid", [authTokenMiddleware, authRecruiterUserTypeMiddleware, validJobIdMiddleware]);
recruiterMiddlewares.put("/deactivatejob/:jobid", [authTokenMiddleware, authRecruiterUserTypeMiddleware, validJobIdMiddleware]);
recruiterMiddlewares.put("/approveapplication/:jobid/:userid", [authTokenMiddleware, authRecruiterUserTypeMiddleware, validJobIdMiddleware, validCandidateIdMiddleware]);
recruiterMiddlewares.put("/refuseapplication/:jobid/:userid", [authTokenMiddleware, authRecruiterUserTypeMiddleware, validJobIdMiddleware, validCandidateIdMiddleware]);

