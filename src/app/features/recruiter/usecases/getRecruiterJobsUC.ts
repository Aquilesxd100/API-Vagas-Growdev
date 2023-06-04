import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import { LoggedUserInfosType } from "../../auth/types/types";

export default async function getRecruiterJobsUC
(loggedUserInfos : LoggedUserInfosType) {
    
    return await jobsRepository.getJobsWithApplicationsByRecruiterId(loggedUserInfos.loggedUser.id as string);
};