import Job from "../../../models/Job";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import { JobsQueriesType } from "../../../shared/types/types";


export default async function getCandidateJobsUC
(queries : JobsQueriesType) : Promise<Array<Job>> {
    let jobs : Array<Job> = await jobsRepository.getAllJobs();
    if (queries.search) {
        jobs = jobs.filter((job) => {
            if (job.companyName?.indexOf(queries.search as string) !== -1) {
                return true;
            };
            if (job.description?.indexOf(queries.search as string) !== -1) {
                return true;
            };
            return false;
        });
    };
    return jobs;
};