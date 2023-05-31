import { Request, Response, NextFunction } from "express";

export default async function authTokenMiddleware
(req: Request, res: Response, next : NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    console.log(authHeader)
    console.log(token)
    next();
};