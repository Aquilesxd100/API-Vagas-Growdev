import { Redis } from "ioredis";
import { redis } from "../../../main/config/redisconfig";

export default class CacheRedisRepository {
    private repository : Redis = redis;

    async getAllCandidates() {
        return await this.repository.get("all-candidates");
    };

    async getAllRecruiters() {
        return await this.repository.get("all-recruiters");
    };
};