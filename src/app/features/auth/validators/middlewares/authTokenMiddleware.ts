import { Request, Response, NextFunction } from "express";
import { UserInfosType } from "../../types/types";
import verifyTokenUC from "../../usecases/verifyTokenUC";
import findAccountByType from "../../usecases/findAccountByType";

export default async function authTokenMiddleware
(req: Request, res: Response, next : NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    let verifiedToken : undefined | UserInfosType = undefined;
    if (typeof token === "string") {
        verifiedToken = verifyTokenUC(token);
    };
    if (!verifiedToken) {
        return res.status(401).send({
            message: "Você não tem permissão para acessar esse conteúdo."
        })        
    };
    
    const loggedUser = await findAccountByType(verifiedToken);
    if (!loggedUser) {
        return res.status(401).send({
            message: "Você não tem mais permissão de acesso, faça login novamente."
        });
    };
    req.body.loggedUserInfos = {
        userType: verifiedToken.userType,
        loggedUser: loggedUser
    };
    next();
};