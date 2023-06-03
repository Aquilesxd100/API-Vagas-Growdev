import { JobEntity } from "../../../shared/entities/job.entity";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import checkUserType from "../../../shared/validators/checkUserType";
import { LoggedUserInfosType } from "../../auth/types/types";

export default async function createJobUC
(loggedUserInfos : LoggedUserInfosType, newJob : JobEntity) {
    checkUserType(loggedUserInfos.userType, ["recruiter"]);
    
    newJob.activeStatus = true;
    newJob.recruiterId = loggedUserInfos.loggedUser.id;
    await jobsRepository.saveJob(newJob)
};