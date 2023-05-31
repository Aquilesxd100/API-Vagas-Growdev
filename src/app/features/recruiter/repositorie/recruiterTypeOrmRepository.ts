import { Repository } from "typeorm";
import { pgHelper } from "../../../shared/helpers/pgHelper";
import { RecruiterEntity } from "../../../shared/entities/recruiter.entity";


class RecruiterTypeOrmRepository {
    private recruiterRepository?: Repository<RecruiterEntity> | any;

    async initializeRepository() : Promise<void> {
        this.recruiterRepository = pgHelper.client.manager.getRepository(RecruiterEntity);
    };

    
};

export const recruiterRepository = new RecruiterTypeOrmRepository;