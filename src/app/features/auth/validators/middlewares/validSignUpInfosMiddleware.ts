import { NextFunction, Request, Response } from "express";
import validNewUserName from "../validNewUserName";
import validNewName from "../validNewName";

export default async function validSignUpInfosMiddleware
(req : Request, res : Response, next : NextFunction) {
    const { username, accountType, password, name } = req.body;
    const infosArray = [username, accountType, password, name];
    
    if (infosArray.some((attribute) => typeof attribute !== "string")) {
        return res.status(400).send({
            message: "Tipo de uma ou mais informações inválidas, por favor informe um username, name, accountType e password válidos."
        });
    };

    if (infosArray.some((attribute) => attribute !== attribute.toLowerCase())) {
        return res.status(400).send({
            message: "Todas as informações devem estar em letra minúscula."
        });
    };

    if (accountType !== "admin"
    && accountType !== "candidate") {
        return res.status(400).send({
            message: "Só é possivel criar contas de admin e candidate por essa rota."
        });
    };

    const checkName : string | true = validNewName(name);
    if (checkName !== true) {
        return res.status(400).send({
            message: checkName
        });
    };

    const checkUserName : string | true = await validNewUserName(username); 
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