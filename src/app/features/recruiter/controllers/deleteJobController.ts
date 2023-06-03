import { Request, Response } from "express";
import deleteJobUC from "../usecases/deleteJobUC";

export default async function deleteJobController(req: Request, res : Response) {
    try {
        const currentJob = req.body.currentJob;
        const loggedUserInfos = req.body.loggedUserInfos;

        await deleteJobUC(loggedUserInfos, currentJob);
        
        return res.status(200).send({
            message: "Vaga excluída com sucesso."
        });

    } catch (error : any) {
        if (error.code) {
            return res.status(error.code).send({
                message: error.message
            });
        };
        return res.status(400).send({
            message : "Erro!"
        });
    };
};