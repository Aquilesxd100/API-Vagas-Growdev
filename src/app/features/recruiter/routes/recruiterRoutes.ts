import { Router } from "express";
import createJobController from "../controllers/createJobController";
import deleteJobController from "../controllers/deleteJobController";
import getRecruiterJobsController from "../controllers/getRecruiterJobsController";
import getCandidatesByJobIdController from "../controllers/getCandidatesByJobIdController";
import activateJobController from "../controllers/activateJobController";
import deactivateJobController from "../controllers/deactivateJobController";
import approveApplicationController from "../controllers/approveApplicationController";
import refuseApplicationController from "../controllers/refuseApplicationController";

export const recruiterRoutes = Router();

recruiterRoutes.post("/createjob", createJobController);
recruiterRoutes.delete("/deletejob/:jobid", deleteJobController);
recruiterRoutes.get("/candidates/:jobid", getCandidatesByJobIdController);
recruiterRoutes.get("/createdjobs", getRecruiterJobsController);
recruiterRoutes.put("/activatejob/:jobid", activateJobController);
recruiterRoutes.put("/deactivatejob/:jobid", deactivateJobController);
recruiterRoutes.put("/approveapplication/:jobid/:userid", approveApplicationController);
recruiterRoutes.put("/refuseapplication/:jobid/:userid", refuseApplicationController);