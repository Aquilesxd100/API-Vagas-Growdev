import { Application } from "express";
import { authMiddlewares } from "../../app/features/auth/routes/authMiddlewares";
import { authRoutes } from "../../app/features/auth/routes/authRoutes";
import { adminMiddlewares } from "../../app/features/admin/routes/adminMiddlewares";
import { adminRoutes } from "../../app/features/admin/routes/adminRoutes";
import { recruiterMiddlewares } from "../../app/features/recruiter/routes/recruiterMiddlewares";
import { recruiterRoutes } from "../../app/features/recruiter/routes/recruiterRoutes";
import { candidateMiddlewares } from "../../app/features/candidate/routes/candidateMiddlewares";
import { candidateRoutes } from "../../app/features/candidate/routes/candidateRoutes";
import { sharedMiddlewares } from "../../app/shared/routes/sharedMiddlewares";
import { sharedRoutes } from "../../app/shared/routes/sharedRoutes";



import authTokenMiddleware from "../../app/features/auth/validators/middlewares/authTokenMiddleware";

export default function registerRoutes(app : Application) {
    app.use(authMiddlewares, authRoutes);
    app.use(adminMiddlewares, adminRoutes);
    app.use(recruiterMiddlewares, recruiterRoutes);
    app.use(candidateMiddlewares, candidateRoutes);
    app.use(sharedMiddlewares, sharedRoutes);

    app.get("/test", authTokenMiddleware)
};