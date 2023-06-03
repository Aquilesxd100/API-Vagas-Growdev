import { JobEntity } from "../../../shared/entities/job.entity";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import checkUserType from "../../../shared/validators/checkUserType";
import { LoggedUserInfosType } from "../../auth/types/types";
import validChangingJobActivation from "../validators/validChangingJobActivation";

export default async function deactivateJobUC
(loggedUserInfos : LoggedUserInfosType, job : JobEntity) {
    checkUserType(loggedUserInfos.userType, ["recruiter"]);
    validChangingJobActivation(loggedUserInfos.loggedUser.id as string, job, "deactivation");

    job.activeStatus = false;
    await jobsRepository.saveJob(job);
};