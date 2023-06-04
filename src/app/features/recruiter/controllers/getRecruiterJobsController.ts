import { Request, Response } from "express";
import { JobEntity } from "../../../shared/entities/job.entity";
import getRecruiterJobsUC from "../usecases/getRecruiterJobsUC";

export default async function getRecruiterJobsController
(req : Request, res : Response) {
    try {
        const loggedUserInfos = req.body.loggedUserInfos;
        const jobs : Array<JobEntity> = await getRecruiterJobsUC(loggedUserInfos);
    
        return res.status(200).send(jobs)

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