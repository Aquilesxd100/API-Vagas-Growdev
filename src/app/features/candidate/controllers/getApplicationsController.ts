import { Request, Response } from "express";
import getApplicationsUC from "../usecases/getApplicationsUC";

export default async function getApplicationsController
(req: Request, res: Response) {
    try {
        const loggedUserInfos = req.body.loggedUserInfos;
        const userApplications = await getApplicationsUC(loggedUserInfos);

        return res.status(200).send(userApplications);

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