import { JobEntity } from "../../../shared/entities/job.entity";
import ForbiddenError from "../../../shared/errors/forbiddenError";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import checkUserType from "../../../shared/validators/checkUserType";
import { LoggedUserInfosType } from "../../auth/types/types";

export default async function deleteJobUC
(loggedUserInfos : LoggedUserInfosType, job : JobEntity) {
    checkUserType(loggedUserInfos.userType, ["recruiter"]);

    if (job.recruiterId !== loggedUserInfos.loggedUser.id) {
        throw new ForbiddenError("Somente o criador da vaga pode a excluir.");
    };

    await jobsRepository.deleteJob(job);
};