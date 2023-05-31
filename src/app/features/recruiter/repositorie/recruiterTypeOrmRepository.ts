import { Repository } from "typeorm";
import { pgHelper } from "../../../shared/helpers/pgHelper";
import { RecruiterEntity } from "../../../shared/entities/recruiter.entity";


class RecruiterTypeOrmRepository {
    private recruiterRepository?: Repository<RecruiterEntity>;

    async initializeRepository() : Promise<void> {
        this.recruiterRepository = pgHelper.client.manager.getRepository(RecruiterEntity);
    };

    async getRecruiterByUserName(username : string) : Promise<RecruiterEntity | null | undefined> {
        return await this.recruiterRepository?.findOne({ where: { userName: username } });
    };
    
};

export const recruiterRepository = new RecruiterTypeOrmRepository;