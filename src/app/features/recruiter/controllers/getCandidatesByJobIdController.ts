import { Request, Response } from "express";
import getCandidatesByJobIdUC from "../usecases/getCandidatesByJobIdUC";
import { ApplicationEntity } from "../../../shared/entities/candidate_x_job_application.entity";

export default async function getCandidatesByJobIdController
(req : Request, res : Response) {
    try {
        const loggedUserInfos = req.body.loggedUserInfos;
        const currentJob = req.body.currentJob;
        
        const candidates : Array<ApplicationEntity> | undefined = await getCandidatesByJobIdUC(loggedUserInfos, currentJob);
        
        return res.status(200).send(candidates);

    } catch (error : any) {
        if (error.statusCode) {
            return res.status(error.statusCode).send({
                message: error.message
            });
        };
        return res.status(400).send({
            message: "Erro!"
        })

    };
};