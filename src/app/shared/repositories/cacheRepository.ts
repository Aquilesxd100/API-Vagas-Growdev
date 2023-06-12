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

    async invalidRecruiters() {
        await this.repository.del("all-recruiters");
    };

};

export const redisRepository = new CacheRedisRepository;