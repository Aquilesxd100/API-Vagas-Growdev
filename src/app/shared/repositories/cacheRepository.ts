import { Redis } from "ioredis";
import { redis } from "../../../main/config/redisconfig";
import { CandidateEntity } from "../entities/candidate.entity";
import { RecruiterEntity } from "../entities/recruiter.entity";
import { JobEntity } from "../entities/job.entity";
import { ApplicationEntity } from "../entities/candidate_x_job_application.entity";
import Job from "../../models/Job";

class CacheRedisRepository {
    private repository : Redis = redis;

    async getAllCandidates() {
        const allCandidates : null | string = await this.repository.get("all-candidates");
        if (allCandidates) {
            return JSON.parse(allCandidates);
        };
        return allCandidates;
    };

    async getCandidateByUsername(username : string) {
        const candidates : null | Array<CandidateEntity> = await this.getAllCandidates();
        if (candidates) {
            return candidates.find((candidate) => candidate.userName === username);
        };
        return candidates;
    };

    async getCandidateById(id : string) {
        const candidates : null | Array<CandidateEntity> = await this.getAllCandidates();
        if (candidates) {
            return candidates.find((candidate) => candidate.id === id);
        };
        return candidates;
    };

    async updateCandidateList(newCandidate : CandidateEntity) {
        const candidateList : null | Array<CandidateEntity> = await this.getAllCandidates();
        if (candidateList) {
            candidateList.push(newCandidate);
            await this.setCandidates(candidateList);
        } else {
            await this.setCandidates([newCandidate]);
        };
    };

    async setCandidates(candidatesList : Array<CandidateEntity>) {
        const processedList = JSON.stringify(candidatesList);
        await this.repository.set("all-candidates", processedList);
    };
    
    async getAllRecruiters() {
        const allRecruiters : null | string = await this.repository.get("all-recruiters");
        if (allRecruiters) {
            return JSON.parse(allRecruiters);
        };
        return allRecruiters;
    };

    async getRecruiterByUsername(username : string) {
        const recruiters : null | Array<RecruiterEntity> = await this.getAllRecruiters();
        if (recruiters) {
            return recruiters.find((recruiter) => recruiter.userName === username);
        };
        return recruiters;
    };

    async getRecruiterById(id : string) {
        const recruiters : null | Array<RecruiterEntity> = await this.getAllRecruiters();
        if (recruiters) {
            return recruiters.find((recruiter) => recruiter.id === id);
        };
        return recruiters;
    };

    async updateRecruitersList(newRecruiter : RecruiterEntity) {
        const recruiterList : null | Array<CandidateEntity> = await this.getAllRecruiters();
        if (recruiterList) {
            recruiterList.push(newRecruiter);
            await this.setRecruiters(recruiterList);
        } else {
            await this.setRecruiters([newRecruiter]);
        };
    };

    async setRecruiters(recruitersList : Array<RecruiterEntity>) {
        const processedList = JSON.stringify(recruitersList);
        await this.repository.set("all-recruiters", processedList);
    };




    async setJobById(job : JobEntity) {
        const processedJob : string = JSON.stringify(job);
        await this.repository.set("job-" + job.id, processedJob);
    };

    async getJobById(jobId : string) {
        const job : string | null = await this.repository.get("job-" + jobId);
        if (job) {
            return JSON.parse(job);
        };
        return job;
    };

    async invalidateJobById(jobId : string) {
        await this.repository.del("job-" + jobId);
    };

    async setAllJobs(jobsList : Array<Job>) {
        const processedJobs : string = JSON.stringify(jobsList);
        await this.repository.set("all-jobs", processedJobs);
    };

    async getAllJobs() {
        const jobs : string | null = await this.repository.get("all-jobs");
        if (jobs) {
            return JSON.parse(jobs);
        };
        return jobs;
    };

    async invalidateAllJobs() {
        await this.repository.del("all-jobs");
    };

    async getJobByIdWithApplications(jobId : string) {
        const jobsList : string | null = await this.repository.get("all-jobs-with-applications");
        if (jobsList) {
            const jobListProcessed : Array<JobEntity> = JSON.parse(jobsList);
            return jobListProcessed.find((job) => job.id === jobId);
        };
        return jobsList as any;
    };

    async setAllJobsWithApplications(jobsList : Array<JobEntity>) {
        const processedJobs : string = JSON.stringify(jobsList);
        await this.repository.set("all-jobs-with-applications", processedJobs);
    };

    async getAllJobsWithApplications() {
        const jobs : string | null = await this.repository.get("all-jobs-with-applications");
        if (jobs) {
            return JSON.parse(jobs);
        };
        return jobs;
    };

    async getAllJobsWithApplicationsByRecruiterId(recruiterId : string) {
        const jobsList : null | Array<JobEntity> = await this.getAllJobsWithApplications();
        if (jobsList) {
            return jobsList.filter((job) => job.recruiterId === recruiterId);
        };
        return jobsList;
    };

    async invalidateAllJobsWithApplications() {
        await this.repository.del("all-jobs-with-applications");
    };



    async getAllApplications() {
        const applications : string | null = await this.repository.get("all-applications");
        if (applications) {
            return JSON.parse(applications);
        };
        return applications;
    };

    async getApplicationsByJobId(jobId : string) {
        const allApplications : Array<ApplicationEntity> | null = await this.getAllApplications();
        if (allApplications) {
            return allApplications.filter((application) => application.jobId === jobId);
        };
        return allApplications;
    };

/*     async setApplications(applicationsList : Array<ApplicationEntity>) {
        const processedList = JSON.stringify(applicationsList);
        await this.repository.set("all-applications", processedList);
    }; */

    async invalidateApplications() {
        await this.repository.del("all-applications");
    };

};

export const redisRepository = new CacheRedisRepository;