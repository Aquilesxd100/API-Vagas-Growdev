import { RecruiterEntity } from "../../../shared/entities/recruiter.entity";
import BadRequestError from "../../../shared/errors/badRequestError";
import { recruiterRepository } from "../../recruiter/repositorie/recruiterTypeOrmRepository";
import { newRecruiterInfosType } from "../types/types";

export default async function 
createRecruiterUC(newRecruiterInfos : newRecruiterInfosType) {
    if (typeof newRecruiterInfos.companyName !== "string") {
        throw new BadRequestError("Nome da empresa inválido!")
    };
    const newRecruiter : RecruiterEntity = new RecruiterEntity;
    newRecruiter.name = newRecruiterInfos.name;
    newRecruiter.userName = newRecruiterInfos.username;
    newRecruiter.password = newRecruiterInfos.password;
    newRecruiter.companyName = newRecruiterInfos.companyName;
    await recruiterRepository.saveRecruiter(newRecruiter);
};