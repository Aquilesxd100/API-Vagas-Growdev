import { Repository } from "typeorm";
import { pgHelper } from "../../../shared/helpers/pgHelper";
import { RecruiterEntity } from "../../../shared/entities/recruiter.entity";
import { redisRepository } from "../../../shared/repositories/cacheRepository";


class RecruiterTypeOrmRepository {
    private recruiterRepository?: Repository<RecruiterEntity>;

    initializeRepository() : void {
        this.recruiterRepository = pgHelper.client.manager.getRepository(RecruiterEntity);
    };

    async getRecruiterById(id : string) : Promise<RecruiterEntity | null | undefined> {
        return await this.recruiterRepository?.findOne({ where: { id: id } });
    };

    async getRecruiterByUserName(username : string) : Promise<RecruiterEntity | null | undefined> {
        const searchedRecruiter = await this.recruiterRepository?.findOne({ where: { userName: username } });
        if (searchedRecruiter) {
            await redisRepository.updateRecruitersList(searchedRecruiter);
        };
        return searchedRecruiter;
    };

    async saveRecruiter(recruiter : RecruiterEntity) : Promise<void> {
        await recruiter.save();
    };
    
};

export const recruiterRepository = new RecruiterTypeOrmRepository;