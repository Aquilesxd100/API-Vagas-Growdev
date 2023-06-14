import { ApplicationEntity } from "../../../shared/entities/candidate_x_job_application.entity";
import { JobEntity } from "../../../shared/entities/job.entity";
import ForbiddenError from "../../../shared/errors/forbiddenError";
import { applicationRepository } from "../../../shared/repositories/applicationsTypeOrmRepository";
import { redisRepository } from "../../../shared/repositories/cacheRepository";
import { LoggedUserInfosType } from "../../auth/types/types";

export default async function getCandidatesByJobIdUC
(loggedUserInfos : LoggedUserInfosType, job : JobEntity) {

    if (job.recruiterId !== loggedUserInfos.loggedUser.id) {
        throw new ForbiddenError("Somente o criador da vaga pode ver as inscrições a ela.");
    };

    const applications : Array<ApplicationEntity> | undefined = await redisRepository.getApplicationsByJobId(job.id as string) || await applicationRepository.getApplicationsByJobId(job.id as string);

    return applications;
};