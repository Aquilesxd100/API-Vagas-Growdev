import { Repository } from "typeorm";
import { pgHelper } from "../../shared/helpers/pgHelper";
import { ApplicationEntity } from "../entities/candidate_x_job_application.entity";


class ApplicationsTypeOrmRepository {
    private applicationsRepository?: Repository<ApplicationEntity>;

    async initializeRepository() : Promise<void> {
        this.applicationsRepository = pgHelper.client.manager.getRepository(ApplicationEntity);
    };

};

export const applicationRepository = new ApplicationsTypeOrmRepository;