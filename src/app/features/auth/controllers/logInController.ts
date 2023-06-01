import { Request, Response } from "express";
import { LogInAccountType } from "../../../models/types";
import newTokenGeneratorUC from "../usecases/newTokenGeneratorUC";
import findAccountUC from "../usecases/findAccountUC";

export default async function logInController(req: Request, res : Response) {
    try {
        const { username, password } = req.body;

        const loggedAccountInfos : LogInAccountType = await findAccountUC(username, password);
        const generatedToken : string = newTokenGeneratorUC(loggedAccountInfos);
        
        return res.status(200).send({
            message: "Login realizado com sucesso!",
            token: generatedToken
        });
    } catch(error : any) {
        if(error.code) {
            return res.status(error.code).send({
                message: error.message
            });
        };
        return res.status(400).send({
            message: "Erro!"
        });
    };
};