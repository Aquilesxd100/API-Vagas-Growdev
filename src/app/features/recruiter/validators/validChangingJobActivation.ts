import { JobEntity } from "../../../shared/entities/job.entity";
import BadRequestError from "../../../shared/errors/badRequestError";
import ForbiddenError from "../../../shared/errors/forbiddenError";
import getCurrentDate from "../../../shared/helpers/getCurrentDate";
import isExpiredDateCheck from "../../../shared/helpers/isExpiredDateCheck";

export default function validChangingJobActivation
(userId : string, job : JobEntity, validType : "activation" | "deactivation") {

    if (userId !== job.recruiterId) {
        throw new ForbiddenError(`Somente o criador da vaga pode a ativar/desativar.`);
    };

    if (validType === "activation" && job.activeStatus) {
        throw new BadRequestError(`Só é possivel ativar vagas que estão desativadas.`);
    };

    if (validType === "deactivation" && !job.activeStatus) {
        throw new BadRequestError(`Só é possivel desativar vagas que estão ativadas.`);
    };
    
    const currentDate = getCurrentDate();
    if (validType === "activation" && isExpiredDateCheck(currentDate, job.expirationDate as string)) {
        throw new BadRequestError(`Vagas com tempo de candidatura expirado não podem ser ativadas.`);
    }; 
     
};