import { Repository } from "typeorm";
import { pgHelper } from "../../../shared/helpers/pgHelper";
import { CandidateEntity } from "../../../shared/entities/candidate.entity";


export class CandidateTypeOrmRepository {
    private candidateRepository?: Repository<CandidateEntity> | any;

    async initializeRepository() : Promise<void> {
        this.candidateRepository = pgHelper.client.manager.getRepository(CandidateEntity);
    };

    
};