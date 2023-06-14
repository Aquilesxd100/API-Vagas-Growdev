import { redisRepository } from "../../../shared/repositories/cacheRepository";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import { LoggedUserInfosType } from "../../auth/types/types";

export default async function getRecruiterJobsUC
(loggedUserInfos : LoggedUserInfosType) {
    
    return await redisRepository.getAllJobsWithApplicationsByRecruiterId(loggedUserInfos.loggedUser.id as string) || await jobsRepository.getJobsWithApplicationsByRecruiterId(loggedUserInfos.loggedUser.id as string);
};