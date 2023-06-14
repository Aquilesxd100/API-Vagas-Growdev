import { JobEntity } from "../../../shared/entities/job.entity";
import { redisRepository } from "../../../shared/repositories/cacheRepository";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import { LoggedUserInfosType } from "../../auth/types/types";
import validChangingJobActivation from "../validators/validChangingJobActivation";

export default async function deactivateJobUC
(loggedUserInfos : LoggedUserInfosType, job : JobEntity) {
    validChangingJobActivation(loggedUserInfos.loggedUser.id as string, job, "deactivation");

    job.activeStatus = false;
    await jobsRepository.saveJob(job);
    await redisRepository.invalidateAllJobsWithApplications();
    await redisRepository.invalidateAllJobs();
    await redisRepository.invalidateJobById(job.id as string);
};