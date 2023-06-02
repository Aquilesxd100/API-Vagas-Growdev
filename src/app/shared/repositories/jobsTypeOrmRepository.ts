import { Repository } from "typeorm";
import { pgHelper } from "../../shared/helpers/pgHelper";
import { JobEntity } from "../entities/job.entity";
import Job from "../../models/Job";


class JobsTypeOrmRepository {
    private jobsRepository?: Repository<JobEntity> | any;

    async initializeRepository() : Promise<void> {
        this.jobsRepository = pgHelper.client.manager.getRepository(JobEntity);
    };

    async getAllJobs() : Promise<Array<Job>> {
        const jobs : Array<JobEntity> = await this.jobsRepository?.find();
        return jobs.map((job : JobEntity) => new Job(job));
    };

    async getAllJobsWithApplications() : Promise<Array<JobEntity>> {
        const jobs : Array<JobEntity> = await this.jobsRepository?.find({
            relations: ["applications"]
        });
        return jobs;
    };

};

export const jobsRepository = new JobsTypeOrmRepository;