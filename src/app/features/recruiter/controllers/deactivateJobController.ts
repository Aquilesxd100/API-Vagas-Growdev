import { Request, Response } from "express";
import deactivateJobUC from "../usecases/deactivateJobUC";

export default async function deactivateJobController
(req : Request, res : Response) {
    try {
        const loggedUserInfos = req.body.loggedUserInfos;
        const currentJob = req.body.currentJob;
        await deactivateJobUC(loggedUserInfos, currentJob);

        return res.status(200).send({
            message: "Vaga desativada com sucesso."
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