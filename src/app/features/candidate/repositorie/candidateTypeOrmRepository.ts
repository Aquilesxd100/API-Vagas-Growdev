import { Repository } from "typeorm";
import { pgHelper } from "../../../shared/helpers/pgHelper";
import { CandidateEntity } from "../../../shared/entities/candidate.entity";


class CandidateTypeOrmRepository {
    private candidateRepository?: Repository<CandidateEntity> | any;

    initializeRepository() : void {
        this.candidateRepository = pgHelper.client.manager.getRepository(CandidateEntity);
    };

    async getCandidateById(id: string) : Promise<CandidateEntity | null | undefined> {
        return await this.candidateRepository?.findOne({ where: { id: id } });
    };

    async getCandidateByUserName(userName : string) : Promise<CandidateEntity | null | undefined> {
        return await this.candidateRepository?.findOne({ where: { userName: userName } });
    };

    async createCandidate(newCandidate : CandidateEntity) : Promise<void> {
        await newCandidate.save();
    };

};

export const candidateRepository = new CandidateTypeOrmRepository;