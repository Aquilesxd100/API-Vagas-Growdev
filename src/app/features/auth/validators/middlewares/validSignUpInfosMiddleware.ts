import { NextFunction, Request, Response } from "express";
import validUserName from "../validUserName";
import validName from "./validName";

export default async function validSignUpInfosMiddleware
(req : Request, res : Response, next : NextFunction) {
    const { username, accountType, password, name } = req.body;
    if ([username, accountType, password, name].some((attribute) => typeof attribute !== "string")) {
        return res.status(400).send({
            message: "Tipo de uma ou mais informações inválidas, por favor informe um username, name, accountType e password válidos."
        });
    };
    if (accountType !== "admin" && accountType !== "candidate") {
        return res.status(400).send({
            message: "Só é possivel criar contas de admin e candidate por essa rota."
        });
    };

    const checkName : string | true = validName(name);
    if (checkName !== true) {
        return res.status(400).send({
            message: checkName
        });
    };

    const checkUserName : string | true = await validUserName(username, accountType); 
    if (checkUserName !== true) {
        return res.status(400).send({
            message: checkUserName
        });
    };

    if (password.length < 5 || password.length > 25) {
        return res.status(400).send({
            message: "O password precisa ter ao menos 5 caracteres e no máximo 25."
        });
    };
    next();
};