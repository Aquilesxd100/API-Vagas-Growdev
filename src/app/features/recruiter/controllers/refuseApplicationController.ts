import { Request, Response } from "express";
import changeApplicationStatusUC from "../usecases/changeApplicationStatusUC";

export default async function refuseApplicationController
(req: Request, res: Response) {
    try {
        const loggedUserInfos = req.body.loggedUserInfos;
        const candidate = req.body.currentCandidate;
        const job = req.body.currentJob;

        await changeApplicationStatusUC(loggedUserInfos, candidate.id, job.id, "refuse");

        return res.status(200).send({
            message: "Status de candidatura atualizado com sucesso."
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