import { AdminEntity } from "../../../shared/entities/admin.entity";
import { CandidateEntity } from "../../../shared/entities/candidate.entity";
import { RecruiterEntity } from "../../../shared/entities/recruiter.entity";
import AuthenticationError from "../../../shared/errors/authenticationError";
import { redisRepository } from "../../../shared/repositories/cacheRepository";
import { adminRepository } from "../../admin/repositorie/adminTypeOrmRepository";
import { candidateRepository } from "../../candidate/repositorie/candidateTypeOrmRepository";
import { recruiterRepository } from "../../recruiter/repositorie/recruiterTypeOrmRepository";
import { UserInfosType } from "../types/types";

export default async function findAccountByType(userInfos : UserInfosType) : Promise<CandidateEntity | AdminEntity | RecruiterEntity | undefined | null> {
    let account : CandidateEntity | AdminEntity | RecruiterEntity | undefined | null = undefined;
    switch (userInfos.userType) {
        case "candidate":
            account = await redisRepository.getCandidateById(userInfos.userId) || await candidateRepository.getCandidateById(userInfos.userId);
        break;
        case "recruiter":
            account = await redisRepository.getRecruiterById(userInfos.userId) || await recruiterRepository.getRecruiterById(userInfos.userId);
        break;
        case "admin":
            account = await adminRepository.getAdminById(userInfos.userId);
        break;
    };
    return account;
};