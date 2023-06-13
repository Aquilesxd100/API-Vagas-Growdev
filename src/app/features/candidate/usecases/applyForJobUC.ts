import { ApplicationEntity } from "../../../shared/entities/candidate_x_job_application.entity";
import { JobEntity } from "../../../shared/entities/job.entity";
import getCurrentDate from "../../../shared/helpers/getCurrentDate";
import { applicationRepository } from "../../../shared/repositories/applicationsTypeOrmRepository";
import { redisRepository } from "../../../shared/repositories/cacheRepository";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import { LoggedUserInfosType } from "../../auth/types/types";
import applyValidator from "../validators/applyValidator";

export default async function applyForJobUC
(loggedUserInfos : LoggedUserInfosType, job : JobEntity) {
    const jobWithApplications = await redisRepository.getJobByIdWithApplications(job.id as string) || await jobsRepository.getJobByIdWithApplications(job.id as string) as JobEntity;
    applyValidator(loggedUserInfos, jobWithApplications);

    const newApplication : ApplicationEntity = new ApplicationEntity;
    newApplication.candidateId = loggedUserInfos.loggedUser.id;
    newApplication.jobId = job.id;
    newApplication.applicationDate = getCurrentDate();

    await applicationRepository.saveApplication(newApplication);
    await redisRepository.updateApplications(newApplication);
    await redisRepository.invalidateAllJobsWithApplications();
};