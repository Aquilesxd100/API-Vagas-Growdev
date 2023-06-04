import { Router } from "express";
import authTokenMiddleware from "../../features/auth/validators/middlewares/authTokenMiddleware";
import validJobsQueriesMiddleware from "../validators/middlewares/validJobsQueriesMiddleware";
import authAdminAndCandidateUserTypeMiddleware from "../../features/auth/validators/middlewares/authAdminAndCandidateUserTypeMiddleware";

export const sharedMiddlewares = Router();
sharedMiddlewares.get("/jobs", authTokenMiddleware, authAdminAndCandidateUserTypeMiddleware, validJobsQueriesMiddleware);
