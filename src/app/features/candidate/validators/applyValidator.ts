import { ApplicationEntity } from "../../../shared/entities/candidate_x_job_application.entity";
import { JobEntity } from "../../../shared/entities/job.entity";
import BadRequestError from "../../../shared/errors/badRequestError";
import getCurrentDate from "../../../shared/helpers/getCurrentDate";
import isExpiredDateCheck from "../../../shared/helpers/isExpiredDateCheck";
import { LoggedUserInfosType } from "../../auth/types/types";

export default async function applyValidator
(loggedUserInfos : LoggedUserInfosType, job : JobEntity) {
    if (job.applications && job.maxApplications && job.applications.length >= job.maxApplications) {
        throw new BadRequestError("Essa vaga já atingiu seu número máximo de candidaturas.");
    };

    if (!job.activeStatus) {
        throw new BadRequestError("Essa vaga não está disponível para candidatura nesse momento.");
    };

    if (job.applications?.some((application : ApplicationEntity) => application.candidateId === loggedUserInfos.loggedUser.id)) {
        throw new BadRequestError("Você já se candidatou para essa vaga.");
    };

    const currentDate : string = getCurrentDate();
    if (isExpiredDateCheck(currentDate, job.expirationDate as string)) {
        throw new BadRequestError("A data limite para candidaturas já expirou.");
    };

};