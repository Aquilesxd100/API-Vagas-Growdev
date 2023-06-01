import { UserInfosType, newAccountType } from "../types/types";
import { AdminEntity } from "../../../shared/entities/admin.entity";
import { CandidateEntity } from "../../../shared/entities/candidate.entity";
import { adminRepository } from "../../admin/repositorie/adminTypeOrmRepository";
import { candidateRepository } from "../../candidate/repositorie/candidateTypeOrmRepository";

export default async function createAccountUC
(newAccountInfos : newAccountType) : Promise<void> {
    const createdAccount : CandidateEntity | AdminEntity = newAccountInfos.accountType === "candidate" 
    ? new CandidateEntity 
    : new AdminEntity;

    createdAccount.name = newAccountInfos.name;
    createdAccount.userName = newAccountInfos.username;
    createdAccount.password = newAccountInfos.password;
    if (newAccountInfos.accountType === "candidate") {
        await candidateRepository.createCandidate(createdAccount);
    } else {
        await adminRepository.createAdmin(createdAccount);
    };
};