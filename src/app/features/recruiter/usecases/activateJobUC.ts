import { JobEntity } from "../../../shared/entities/job.entity";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import { LoggedUserInfosType } from "../../auth/types/types";
import validChangingJobActivation from "../validators/validChangingJobActivation";

export default async function activateJobUC
(loggedUserInfos : LoggedUserInfosType, job : JobEntity) {
    validChangingJobActivation(loggedUserInfos.loggedUser.id as string, job, "activation");

    job.activeStatus = true;
    await jobsRepository.saveJob(job);
};