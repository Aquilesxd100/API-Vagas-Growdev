import { Redis } from "ioredis";
import { redis } from "../../../main/config/redisconfig";
import { CandidateEntity } from "../entities/candidate.entity";
import { RecruiterEntity } from "../entities/recruiter.entity";

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

    async setCandidates(candidatesList : Array<CandidateEntity>) {
        const processedList = JSON.stringify(candidatesList);
        await this.repository.set("all-candidates", processedList);
    };

    async invalidCandidates() {
        await this.repository.del("all-candidates");
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

    async setRecruiters(recruitersList : Array<RecruiterEntity>) {
        const processedList = JSON.stringify(recruitersList);
        await this.repository.set("all-recruiters", processedList);
    };

    async invalidRecruiters() {
        await this.repository.del("all-recruiters");
    };

};

export const redisRepository = new CacheRedisRepository;