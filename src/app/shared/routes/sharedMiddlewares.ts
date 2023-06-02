import { Router } from "express";
import authTokenMiddleware from "../../features/auth/validators/middlewares/authTokenMiddleware";
import validJobsQueriesMiddleware from "../validators/middlewares/validJobsQueriesMiddleware";

export const sharedMiddlewares = Router();
sharedMiddlewares.get("/jobs", authTokenMiddleware, validJobsQueriesMiddleware);
