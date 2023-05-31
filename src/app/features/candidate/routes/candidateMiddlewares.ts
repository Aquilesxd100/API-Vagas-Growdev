import { Router } from "express";

export const candidateMiddlewares = Router();

candidateMiddlewares.post("/apply/:jobid", []);
candidateMiddlewares.get("/applications", []);