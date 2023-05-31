import { Repository } from "typeorm";
import { pgHelper } from "../../../shared/helpers/pgHelper";
import { CandidateEntity } from "../../../shared/entities/candidate.entity";


class CandidateTypeOrmRepository {
    private candidateRepository?: Repository<CandidateEntity> | any;

    async initializeRepository() : Promise<void> {
        this.candidateRepository = pgHelper.client.manager.getRepository(CandidateEntity);
    };

    async getCandidateByUserName(userName : string) : Promise<CandidateEntity | null | undefined> {
        return await this.candidateRepository?.findOne({ where: { userName: userName } });
    };

};

export const candidateRepository = new CandidateTypeOrmRepository;