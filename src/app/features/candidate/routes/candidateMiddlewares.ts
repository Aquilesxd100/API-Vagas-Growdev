import { Router } from "express";
import authTokenMiddleware from "../../auth/validators/middlewares/authTokenMiddleware";
import validJobIdMiddleware from "../../../shared/validators/middlewares/validJobIdMiddleware";
import authCandidateUserTypeMiddleware from "../../auth/validators/middlewares/authCandidateUserTypeMiddleware";

export const candidateMiddlewares = Router();

candidateMiddlewares.post("/apply/:jobid", [authTokenMiddleware, authCandidateUserTypeMiddleware, validJobIdMiddleware]);
candidateMiddlewares.get("/applications", authTokenMiddleware, authCandidateUserTypeMiddleware);