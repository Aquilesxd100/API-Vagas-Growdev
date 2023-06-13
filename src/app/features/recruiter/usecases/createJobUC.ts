import { JobEntity } from "../../../shared/entities/job.entity";
import { redisRepository } from "../../../shared/repositories/cacheRepository";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import { LoggedUserInfosType } from "../../auth/types/types";

export default async function createJobUC
(loggedUserInfos : LoggedUserInfosType, newJob : JobEntity) {
    
    newJob.activeStatus = true;
    newJob.recruiterId = loggedUserInfos.loggedUser.id;
    await jobsRepository.saveJob(newJob)
    await redisRepository.updateJobsList(newJob);
    await redisRepository.saveJobById(newJob);
    await redisRepository.invalidateAllJobsWithApplications();
};