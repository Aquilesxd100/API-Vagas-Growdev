import { NextFunction, Request, Response } from "express";
import validNewUserName from "../../../features/auth/validators/validNewUserName";
import validNewName from "../../../features/auth/validators/validNewName";

export default async function validSignUpInfosMiddleware
(req : Request, res : Response, next : NextFunction) {
    let { username, password, name } = req.body;
    const infosArray = [username, password, name];
    
    if (infosArray.some((attribute) => typeof attribute !== "string")) {
        return res.status(400).send({
            message: "Tipo de uma ou mais informações inválidas."
        });
    };

    if (username !== username.toLowerCase()) {
        return res.status(400).send({
            message: "O username deve ter somente letras minúsculas."
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