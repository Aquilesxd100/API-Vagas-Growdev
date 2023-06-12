import { newAccountType } from "../types/types";
import { AdminEntity } from "../../../shared/entities/admin.entity";
import { CandidateEntity } from "../../../shared/entities/candidate.entity";
import { adminRepository } from "../../admin/repositorie/adminTypeOrmRepository";
import { candidateRepository } from "../../candidate/repositorie/candidateTypeOrmRepository";
import BadRequestError from "../../../shared/errors/badRequestError";
import { redisRepository } from "../../../shared/repositories/cacheRepository";

export default async function createAccountUC
(newAccountInfos : newAccountType) : Promise<void> {

    if (typeof newAccountInfos.accountType !== "string") {
        throw new BadRequestError("Informe um tipo válido de conta a ser criada.");
    };
    newAccountInfos.accountType = newAccountInfos.accountType.toLowerCase();

    if (newAccountInfos.accountType !== "admin"
    && newAccountInfos.accountType !== "candidate") {
        throw new BadRequestError("Só é possivel criar contas de admin e candidate por essa rota.");
    };
    
    const createdAccount : CandidateEntity | AdminEntity = newAccountInfos.accountType === "candidate" 
    ? new CandidateEntity 
    : new AdminEntity;

    createdAccount.name = newAccountInfos.name;
    createdAccount.userName = newAccountInfos.username;
    createdAccount.password = newAccountInfos.password;
    if (newAccountInfos.accountType === "candidate") {
        await candidateRepository.createCandidate(createdAccount);
        await redisRepository.updateCandidateList(createdAccount);
    } else {
        await adminRepository.createAdmin(createdAccount);
    };
};