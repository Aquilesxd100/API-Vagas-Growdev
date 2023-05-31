import { NextFunction, Request, Response } from "express";

export default async function validLoginInfosMiddleware
(req : Request, res : Response, next : NextFunction) {
    const { username, password } = req.body;
    if ([username, password].some((attribute) => typeof attribute !== "string")) {
        return res.status(400).send({
            message: "Tipo de uma ou mais informações inválidas, por favor informe um username e password válidos."
        });
    };

    

    next();
};