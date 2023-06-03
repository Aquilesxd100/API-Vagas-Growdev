import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import checkUserType from "../../../shared/validators/checkUserType";
import { LoggedUserInfosType } from "../../auth/types/types";

export default async function getRecruiterJobsUC
(loggedUserInfos : LoggedUserInfosType) {
    checkUserType(loggedUserInfos.userType, ["recruiter"]);
    
    return await jobsRepository.getJobsWithApplicationsByRecruiterId(loggedUserInfos.loggedUser.id as string);
};