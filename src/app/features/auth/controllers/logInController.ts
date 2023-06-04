import { Request, Response } from "express";
import { LogInAccountType } from "../types/types";
import newTokenGeneratorUC from "../usecases/newTokenGeneratorUC";
import findAccountInfosUC from "../usecases/findAccountInfosUC";

export default async function logInController(req: Request, res : Response) {
    try {
        const { username, password } = req.body;

        const loggedAccountInfos : LogInAccountType = await findAccountInfosUC(username, password);
        const generatedToken : string = newTokenGeneratorUC(loggedAccountInfos);
        
        return res.status(200).send({
            message: "Login realizado com sucesso!",
            token: generatedToken
        });
    } catch(error : any) {
        if(error.statusCode) {
            return res.status(error.statusCode).send({
                message: error.message
            });
        };
        return res.status(400).send({
            message: "Erro!"
        });
    };
};