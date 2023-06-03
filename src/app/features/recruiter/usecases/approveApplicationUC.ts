import { ApplicationEntity } from "../../../shared/entities/candidate_x_job_application.entity";
import BadRequestError from "../../../shared/errors/badRequestError";
import ForbiddenError from "../../../shared/errors/forbiddenError";
import NotFoundError from "../../../shared/errors/notFoundError";
import { applicationRepository } from "../../../shared/repositories/applicationsTypeOrmRepository";
import checkUserType from "../../../shared/validators/checkUserType";
import { LoggedUserInfosType } from "../../auth/types/types";

export default async function approveApplicationUC
(loggedUserInfos : LoggedUserInfosType, candidateId : string, jobId : string) {
    checkUserType(loggedUserInfos.userType, ["recruiter"]);

    if (jobId !== loggedUserInfos.loggedUser.id) {
        throw new ForbiddenError("Somente o criador da vaga pode alterar seus status de candidatura.");
    };

    const allApplications  = await applicationRepository.getApplicationsByJobId("jobId") as Array<ApplicationEntity>;

    const foundApplication : ApplicationEntity | undefined = allApplications.find((application) => application.candidateId === candidateId);

    if (!foundApplication) {
        throw new NotFoundError("Nenhum usuário com esse ID foi encontrado nas candidaturas para essa vaga.");
    };

    if (foundApplication.approval) {
        throw new BadRequestError("Esse candidato já esta como aprovado nessa vaga.");
    };

    foundApplication.approval = true;
    await applicationRepository.saveApplication(foundApplication);
};