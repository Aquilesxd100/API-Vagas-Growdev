import queriesLowCaseConveter from "../helpers/queriesLowCaseConverter";
import queryBooleanConverter from "../helpers/queryBooleanConverter";
import { jobsRepository } from "../../../shared/repositories/jobsTypeOrmRepository";
import { JobsQueriesType } from "../../../shared/types/types";
import validAdminJobsQueries from "../validators/validAdminJobsQueries";
import { JobEntity } from "../../../shared/entities/job.entity";
import isExpiredDateCheck from "../../../shared/helpers/isExpiredDateCheck";

export default async function getAdminJobsUC
(queries : JobsQueriesType) : Promise<Array<JobEntity>> {
    queries = queriesLowCaseConveter(queries)
    validAdminJobsQueries(queries);
    queries = queryBooleanConverter(queries);
    let jobs : Array<JobEntity> = await jobsRepository.getAllJobsWithApplications();
    if (queries.recruiter) {
        jobs = jobs.filter((job) => job.recruiterId === queries.recruiter);
    };

    if (queries.active !== undefined) {
        jobs = jobs.filter((job) => job.activeStatus === queries.active);
    };

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

    if (queries.empty === false) {
        jobs = jobs.filter((job : any) => job.applications.length);
    };

    if (queries.full === false) {
        jobs = jobs.filter((job) => {
            if (job.maxApplications && job.applications) {
                if (job.maxApplications <= job.applications.length) {
                    return false;
                };
            };
            return true;
        });
    };

    if (queries.date) {
        jobs = jobs.filter((job) => !isExpiredDateCheck
        (queries.date as string, job.expirationDate as string))
    };

    return jobs;
};