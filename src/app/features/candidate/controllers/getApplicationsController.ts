import { Request, Response } from "express";
import getApplicationsUC from "../usecases/getApplicationsUC";
import { redisRepository } from "../../../shared/repositories/cacheRepository";

export default async function getApplicationsController
(req: Request, res: Response) {
    try {
        const loggedUserInfos = req.body.loggedUserInfos;
        const userApplications = await redisRepository.getApplicationsByCandidateId(loggedUserInfos.loggedUser.id) || await getApplicationsUC(loggedUserInfos);

        return res.status(200).send(userApplications);

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