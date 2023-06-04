import { ApplicationEntity } from "../../../shared/entities/candidate_x_job_application.entity";
import BadRequestError from "../../../shared/errors/badRequestError";
import ForbiddenError from "../../../shared/errors/forbiddenError";
import NotFoundError from "../../../shared/errors/notFoundError";
import { applicationRepository } from "../../../shared/repositories/applicationsTypeOrmRepository";
import { LoggedUserInfosType } from "../../auth/types/types";

export default async function changeApplicationStatusUC
(loggedUserInfos : LoggedUserInfosType, candidateId : string, jobId : string, status : "approve" | "refuse") {
    const errorMessage : string = status === "approve" ? "aprovado" : "não aprovado";

    if (jobId !== loggedUserInfos.loggedUser.id) {
        throw new ForbiddenError("Somente o criador da vaga pode alterar seus status de candidatura.");
    };

    const allApplications  = await applicationRepository.getApplicationsByJobId(jobId) as Array<ApplicationEntity>;

    const foundApplication : ApplicationEntity | undefined = allApplications.find((application) => application.candidateId === candidateId);

    if (!foundApplication) {
        throw new NotFoundError("Nenhum usuário com esse ID foi encontrado nas candidaturas para essa vaga.");
    };

    if (status === "approve" && foundApplication.approval || status === "refuse" && !foundApplication.approval) {
        throw new BadRequestError(`Esse candidato já esta como ${errorMessage} nessa vaga.`);
    };

    foundApplication.approval = status === "approve" ? true : false;
    await applicationRepository.saveApplication(foundApplication);
};