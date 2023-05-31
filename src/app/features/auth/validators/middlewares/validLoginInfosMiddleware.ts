import { NextFunction, Request, Response } from "express";
import { candidateRepository } from "../../../candidate/repositorie/candidateTypeOrmRepository";
import { recruiterRepository } from "../../../recruiter/repositorie/recruiterTypeOrmRepository";
import { adminRepository } from "../../../admin/repositorie/adminTypeOrmRepository";
import { LogInAccountType } from "../../../../models/types";

export default async function validLoginInfosMiddleware
(req : Request, res : Response, next : NextFunction) {
    const { username, password } = req.body;
    const infosArray = [username, password];

    if (infosArray.some((attribute) => typeof attribute !== "string")) {
        return res.status(400).send({
            message: "Tipo de uma ou mais informações inválidas, por favor informe um username e password válidos."
        });
    };

    if (infosArray.some((attribute) => attribute !== attribute.toLowerCase())) {
        return res.status(400).send({
            message: "Todos os dados devem estar em letra minúscula."
        });
    };

    const loggedAccountInfos : LogInAccountType = {
        userId : "",
        userType : "candidate",
        user: null
    };

    const checkCandidateAccount = await candidateRepository.getCandidateByUserName(username);

    if (checkCandidateAccount) {
        loggedAccountInfos.userId = checkCandidateAccount.id as string;
        loggedAccountInfos.userType = "candidate";
        loggedAccountInfos.user = checkCandidateAccount;
    };

    const checkRecruiterAccount = !checkCandidateAccount 
    ? await recruiterRepository.getRecruiterByUserName(username) 
    : undefined;

    if (checkRecruiterAccount) {
        loggedAccountInfos.userId = checkRecruiterAccount.id as string;
        loggedAccountInfos.userType = "recruiter";
        loggedAccountInfos.user = checkRecruiterAccount;
    };

    const checkAdminAccount = !checkCandidateAccount && !checkRecruiterAccount
    ? await adminRepository.getAdminByUserName(username) 
    : undefined;

    if (checkAdminAccount) {
        loggedAccountInfos.userId = checkAdminAccount.id as string;
        loggedAccountInfos.userType = "admin";
        loggedAccountInfos.user = checkAdminAccount;
    };


    if (!loggedAccountInfos.user || loggedAccountInfos.user.password !== password) {
        return res.status(400).send({
            message: "Login ou/e senha incorreto(s)."
        })
    };

    req.body.loggedAccountInfos = loggedAccountInfos;
    next();
};