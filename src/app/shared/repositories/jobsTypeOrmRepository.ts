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
        return await this.jobsRepository?.findOne(
            { 
                where: {
                    id: jobId,
                },
                relations: {
                    applications: true
                }
        });
    };

    async getAllJobs() : Promise<Array<Job>> {
        const jobs : Array<JobEntity> = await this.jobsRepository?.find();
        return jobs.map((job : JobEntity) => new Job(job));
    };

    async getAllJobsWithApplications() : Promise<Array<JobEntity>> {
        const jobs : Array<JobEntity> = await this.jobsRepository?.find({
            relations: {
                applications: true,
            }
        });
        return jobs;
    };

    async getJobsWithApplicationsByRecruiterId(recruiterId : string) : Promise<Array<JobEntity>> {
        const jobs : Array<JobEntity> = await this.jobsRepository?.find({
            where: { recruiterId: recruiterId },
            relations: ["applications"]
        });
        return jobs;
    };

    async saveJob(job : JobEntity) : Promise<void> {
        await job.save();
    };

    async deleteJob(jobToRemove : JobEntity) : Promise<void> {
        await this.jobsRepository.remove(jobToRemove);
    };

};

export const jobsRepository = new JobsTypeOrmRepository;