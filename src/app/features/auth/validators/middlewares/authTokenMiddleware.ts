import { Request, Response, NextFunction } from "express";
import { UserInfosType } from "../../../../models/types";
import verifyTokenUC from "../../usecases/verifyTokenUC";

export default async function authTokenMiddleware
(req: Request, res: Response, next : NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    let verifiedToken : undefined | UserInfosType = undefined;
    if (typeof token === "string") {
        verifiedToken = verifyTokenUC(token);
    };
    console.log(authHeader)
    console.log(token)
    console.log(verifiedToken)
    next();
};