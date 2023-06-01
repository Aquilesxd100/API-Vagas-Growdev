import { Request, Response, NextFunction } from "express";
import { UserInfosType } from "../../types/types";
import verifyTokenUC from "../../usecases/verifyTokenUC";

export default async function authTokenMiddleware
(req: Request, res: Response, next : NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    let verifiedToken : undefined | UserInfosType = undefined;
    if (typeof token === "string") {
        verifiedToken = verifyTokenUC(token);
    };
    if (!verifiedToken) {
        res.status(401).send({
            message: "Você não tem permissão para acessar esse conteúdo."
        })        
    };
    req.body.loggedUser = verifiedToken;
    next();
};