import { Router, Request, Response } from "express";
import { LoggedUserInfosType } from "../../features/auth/types/types";
import checkUserType from "../validators/checkUserType";
import Jobs from "../../models/Job";
import { JobsQueriesType } from "../types/types";
import getAdminJobsUC from "../../features/admin/usecases/getAdminJobsUC";
import getCandidateJobsUC from "../../features/candidate/usecases/getCandidateJobsUC";

export const sharedRoutes = Router();
sharedRoutes.get("/jobs", async (req: Request, res: Response) => {
    try {
        const queries : JobsQueriesType = {
            date: req.query.date,
            recruiter: req.query.recruiter,
            active: req.query.active,
            full: req.query.full,
            empty: req.query.empty,
            search: req.query.search
        } as JobsQueriesType;


        const loggedUser : LoggedUserInfosType = req.body.loggedUserInfos;
        checkUserType(loggedUser.userType, ["admin", "candidate"]);

        let jobs : Array<Jobs> = []; 

        if (loggedUser.userType === "admin") {
            jobs = await getAdminJobsUC(queries);
        } else {
            jobs = await getCandidateJobsUC(queries);
        };

        return res.status(200).send(jobs);

    } catch(error : any) {
        console.log(error)
        if (error.statusCode) {
            return res.status(error.statusCode).send({
                message: error.message
            });
        };
        return res.status(400).send({
            message: "Erro!"
        });
    };
});