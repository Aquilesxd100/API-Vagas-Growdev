import { Request, Response } from "express";
import applyForJobUC from "../usecases/applyForJobUC";

export default async function applyForJobController
(req : Request, res : Response) {
    try {
        const currentJob = req.body.currentJob;
        const loggedUserInfos = req.body.loggedUserInfos;
        
        await applyForJobUC(loggedUserInfos, currentJob);

        return res.status(200).send({
            message: "Inscrição efetuada com sucesso!"
        });

    } catch (error : any) {
        if (error.statusCode) {
            return res.status(error.statusCode).send({
                message: error.message
            });
        };
        return res.status(400).send({
            message: "Erro!"
        });
    };
};