import { Repository } from "typeorm";
import { pgHelper } from "../../shared/helpers/pgHelper";
import { ApplicationEntity } from "../entities/candidate_x_job_application.entity";


class ApplicationsTypeOrmRepository {
    private applicationsRepository?: Repository<ApplicationEntity>;

    initializeRepository() : void {
        this.applicationsRepository = pgHelper.client.manager.getRepository(ApplicationEntity);
    };

    async saveApplication(application : ApplicationEntity) : Promise<void> {
        await application.save();
    };

    async getApplicationsByJobId(jobId : string) : Promise<Array<ApplicationEntity> | undefined> {
        return await this.applicationsRepository?.find({
            where: { jobId: jobId }
        });
    };
};

export const applicationRepository = new ApplicationsTypeOrmRepository;