import { Repository } from "typeorm";
import { pgHelper } from "../../shared/helpers/pgHelper";
import { JobEntity } from "../entities/job.entity";
import Job from "../../models/Job";


class JobsTypeOrmRepository {
    private jobsRepository?: Repository<JobEntity> | any;

    initializeRepository() : void {
        this.jobsRepository = pgHelper.client.manager.getRepository(JobEntity);
    };

    async getJobById(jobId : string) : Promise<JobEntity | undefined> {
        return await this.jobsRepository?.findOne({ where: { id: jobId } });
    };

    async getJobByIdWithApplications(jobId : string) : Promise<JobEntity | undefined> {
        return await this.jobsRepository?.findOne({ where: {
            id: jobId,
            relations: ["applications"]
        }});
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

    async saveJob(newJob : JobEntity) : Promise<void> {
        await newJob.save();
    };

    async deleteJob(jobToRemove : JobEntity) : Promise<void> {
        await jobToRemove.remove();
    };

};

export const jobsRepository = new JobsTypeOrmRepository;