import Job from "../../../models/Job";
import { JobEntity } from "../../../shared/entities/job.entity";
import { redisRepository } from "../../../shared/repositories/cacheRepository";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import { LoggedUserInfosType } from "../../auth/types/types";

export default async function getApplicationsUC(loggedUserInfos : LoggedUserInfosType) {
    let allJobs : Array<JobEntity> = await redisRepository.getAllJobsWithApplications();
    if (!allJobs) {
        allJobs = await jobsRepository.getAllJobsWithApplications();
        await redisRepository.setAllJobsWithApplications(allJobs);
    };

    const filteredJobs = allJobs.filter((job) => {
        if (job.applications?.some((application) => application.candidateId === loggedUserInfos.loggedUser.id)) {
            return true;
        };
        return false;
    });
    
    return filteredJobs.map((job) => new Job(job));
};