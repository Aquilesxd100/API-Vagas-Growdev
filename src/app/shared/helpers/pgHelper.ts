import { DataSource, QueryRunner } from "typeorm";
import config from "../../../main/config/ormconfig";
import { candidateRepository } from "../../features/candidate/repositorie/candidateTypeOrmRepository";
import { adminRepository } from "../../features/admin/repositorie/adminTypeOrmRepository";
import { recruiterRepository } from "../../features/recruiter/repositorie/recruiterTypeOrmRepository";

export const pgHelper = {
    client: null as unknown as DataSource,
    async connect(): Promise<void> {
        this.client = new DataSource(config);
        await this.client.initialize();
        candidateRepository.initializeRepository();
        adminRepository.initializeRepository();  
        recruiterRepository.initializeRepository();     
    },
    async disconnect(): Promise<void> {
        await this.client.destroy();
        this.client = null as any;
    }
};