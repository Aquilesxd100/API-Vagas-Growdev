import { Request, Response, NextFunction } from "express";

export default function authAdminAndCandidateUserTypeMiddleware
(req: Request, res: Response, next : NextFunction) {
    const userType = req.body.loggedUserInfos.userType;

    if (userType !== "candidate" && userType !== "admin") {
        return res.status(403).send({
            message: "Você não tem acesso a essa rota."
        })
    };

    next();
};