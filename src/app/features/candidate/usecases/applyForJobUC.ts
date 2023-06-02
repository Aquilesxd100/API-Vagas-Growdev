import { ApplicationEntity } from "../../../shared/entities/candidate_x_job_application.entity";
import { JobEntity } from "../../../shared/entities/job.entity";
import getCurrentDate from "../../../shared/helpers/getCurrentDate";
import { applicationRepository } from "../../../shared/repositories/applicationsTypeOrmRepository";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import checkUserType from "../../../shared/validators/checkUserType";
import { LoggedUserInfosType } from "../../auth/types/types";
import applyValidator from "../validators/applyValidator";

export default async function applyForJobUC
(loggedUserInfos : LoggedUserInfosType, job : JobEntity) {
    checkUserType(loggedUserInfos.userType, ["candidate"]);

    const jobWithApplications = await jobsRepository.getJobByIdWithApplications(job.id as string) as JobEntity;

    await applyValidator(loggedUserInfos, jobWithApplications);

    const newApplication : ApplicationEntity = new ApplicationEntity;
    newApplication.candidateId = loggedUserInfos.loggedUser.id;
    newApplication.jobId = job.id;
    newApplication.applicationDate = getCurrentDate();

    await applicationRepository.createNewApplication(newApplication);
};