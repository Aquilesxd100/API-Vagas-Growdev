import { JobEntity } from "../../../shared/entities/job.entity";
import ForbiddenError from "../../../shared/errors/forbiddenError";
import { applicationRepository } from "../../../shared/repositories/applicationsTypeOrmRepository";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import { LoggedUserInfosType } from "../../auth/types/types";

export default async function deleteJobUC
(loggedUserInfos : LoggedUserInfosType, job : JobEntity) {

    if (job.recruiterId !== loggedUserInfos.loggedUser.id) {
        throw new ForbiddenError("Somente o criador da vaga pode a excluir.");
    };

    job = await jobsRepository.getJobByIdWithApplications(job.id as string) as JobEntity;


    if (job.applications && job.applications.length) {
        await applicationRepository.deleteApplications(job.applications);
    };
    await jobsRepository.deleteJob(job);
};