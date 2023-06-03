import { Request, Response } from "express";
import activateJobUC from "../usecases/activateJobUC";

export default async function activateJobController
(req : Request, res : Response) {
    try {
        const loggedUserInfos = req.body.loggedUserInfos;
        const currentJob = req.body.currentJob;
        await activateJobUC(loggedUserInfos, currentJob);

        return res.status(200).send({
            message: "Vaga ativada com sucesso."
        });        
        
    } catch (error : any) {
        if (error.code) {
            return res.status(error.code).send({
                message: error.message
            });
        };
        return res.status(400).send({
            message: "Erro!"
        });
    };
};