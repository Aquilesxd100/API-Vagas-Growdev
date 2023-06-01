import { Request, Response } from "express";
import createAccountUC from "../usecases/createAccountUC";
import { newAccountType } from "../types/types";

export default async function createAccountController(req: Request, res: Response) {
    const { username, accountType, password, name } = req.body;
    const newAccountInfos : newAccountType = {
        name: name,
        username: username,
        password: password,
        accountType: accountType
    };
    await createAccountUC(newAccountInfos);
    return res.status(200).send({
        message: "Conta criada com sucesso!"
    });
};