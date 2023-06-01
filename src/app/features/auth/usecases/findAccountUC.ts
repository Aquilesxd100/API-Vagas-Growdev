import { LogInAccountType } from "../../../models/types";
import AuthenticationError from "../../../shared/errors/authenticationError";
import NotFoundError from "../../../shared/errors/notFoundError";
import { adminRepository } from "../../admin/repositorie/adminTypeOrmRepository";
import { candidateRepository } from "../../candidate/repositorie/candidateTypeOrmRepository";
import { recruiterRepository } from "../../recruiter/repositorie/recruiterTypeOrmRepository";

export default async function findAccountUC
(username : string, password : string) : Promise<LogInAccountType> {
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
        throw new AuthenticationError("Login ou/e senha incorreto(s).");
    };

    return loggedAccountInfos;
};