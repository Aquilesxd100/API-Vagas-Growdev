import { Request, Response } from "express";
import createJobUC from "../usecases/createJobUC";
import { JobEntity } from "../../../shared/entities/job.entity";

export default async function createJobController
(req : Request, res : Response) {
    try {
        const { description, companyName, expirationDate, maxApplications } = req.body;
        const loggedUserInfos = req.body.loggedUserInfos;

        const newJob : JobEntity = new JobEntity;
        newJob.description = description;
        newJob.companyName = companyName;
        newJob.expirationDate = expirationDate;
        if (maxApplications) newJob.maxApplications = maxApplications;
        await createJobUC(loggedUserInfos, newJob);

        return res.status(200).send({
            message: "Vaga criada com sucesso."
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