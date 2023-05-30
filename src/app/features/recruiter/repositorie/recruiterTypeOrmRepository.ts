import { Repository } from "typeorm";
import { pgHelper } from "../../../shared/helpers/pgHelper";
import { RecruiterEntity } from "../../../shared/entities/recruiter.entity";


export class RecruiterTypeOrmRepository {
    private recruiterRepository?: Repository<RecruiterEntity> | any;

    async initializeRepository() : Promise<void> {
        this.recruiterRepository = pgHelper.client.manager.getRepository(RecruiterEntity);
    };

    
};