import Job from "../../../models/Job";
import { JobEntity } from "../../../shared/entities/job.entity";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import checkUserType from "../../../shared/validators/checkUserType";
import { LoggedUserInfosType } from "../../auth/types/types";

export default async function getApplicationsUC(loggedUserInfos : LoggedUserInfosType) {
    checkUserType(loggedUserInfos.userType, ["candidate"]);
    const allJobs : Array<JobEntity> = await jobsRepository.getAllJobsWithApplications();
    const filteredJobs = allJobs.filter((job) => {
        if (job.applications?.some((application) => application.candidateId === loggedUserInfos.loggedUser.id)) {
            return true;
        };
        return false;
    });
    
    return filteredJobs.map((job) => new Job(job));
};