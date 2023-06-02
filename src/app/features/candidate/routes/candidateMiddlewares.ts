import { Router } from "express";
import authTokenMiddleware from "../../auth/validators/middlewares/authTokenMiddleware";
import validJobIdMiddleware from "../../../shared/validators/middlewares/validJobIdMiddleware";

export const candidateMiddlewares = Router();

candidateMiddlewares.post("/apply/:jobid", [authTokenMiddleware, validJobIdMiddleware]);
candidateMiddlewares.get("/applications", authTokenMiddleware);