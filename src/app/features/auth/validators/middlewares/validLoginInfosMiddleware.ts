import { NextFunction, Request, Response } from "express";

export default async function validLoginInfosMiddleware
(req : Request, res : Response, next : NextFunction) {
    const { username, password } = req.body;
    const infosArray = [username, password];
    
    if (infosArray.some((attribute) => typeof attribute !== "string")) {
        return res.status(400).send({
            message: "Tipo de username e/ou password invalido(s)."
        });
    };

    if (infosArray.some((attribute) => attribute !== attribute.toLowerCase())) {
        return res.status(400).send({
            message: "Todos os dados devem estar em letra minúscula."
        });
    };
    next();
};
