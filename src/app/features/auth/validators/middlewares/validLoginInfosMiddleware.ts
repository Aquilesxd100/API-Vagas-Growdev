import { NextFunction, Request, Response } from "express";
import { candidateRepository } from "../../../candidate/repositorie/candidateTypeOrmRepository";
import { recruiterRepository } from "../../../recruiter/repositorie/recruiterTypeOrmRepository";
import { adminRepository } from "../../../admin/repositorie/adminTypeOrmRepository";

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

    const checkCandidateAccount = await candidateRepository.getCandidateByUserName(username);

    const checkRecruiterAccount = !checkCandidateAccount 
    ? await recruiterRepository.getRecruiterByUserName(username) 
    : undefined;

    const checkAdminAccount = !checkCandidateAccount && !checkRecruiterAccount 
    ? await adminRepository.getAdminByUserName(username) 
    : undefined;

    const loggedAccount = [checkCandidateAccount, checkRecruiterAccount, checkAdminAccount].find((account) => account);

    if (!loggedAccount || loggedAccount.password !== password) {
        return res.status(400).send({
            message: "Login ou senha incorretos."
        })
    };

    next();
};