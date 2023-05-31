import { Request, Response } from "express";
import { UserInfosType } from "../../../models/types";
import newTokenGeneratorUC from "../usecases/newTokenGeneratorUC";

export default function logInController(req: Request, res : Response) {
    const loggedAccountInfos : UserInfosType = {
        userId : req.body.loggedAccountInfos.userId ,
        userType : req.body.loggedAccountInfos.userType
    };
    const generatedToken : string = newTokenGeneratorUC(loggedAccountInfos);

    return res.status(200).send({
        message: "Login realizado com sucesso!",
        token: generatedToken
    });
};