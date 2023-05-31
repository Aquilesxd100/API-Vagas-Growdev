import { Router } from "express";

export const candidateRoutes = Router();

candidateRoutes.post("/apply/:jobid", []);
candidateRoutes.get("/applications", []);