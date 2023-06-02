import { JobEntity } from "../shared/entities/job.entity";

export default class Job {
    id?: string;
    description?: string;
    companyName?: string;
    expirationDate?: string;
    activeStatus?: boolean;
    recruiterId?: string;
    maxApplications?: number | null;
    
    constructor(jobEntity : JobEntity) {
        this.id = jobEntity.id;
        this.activeStatus = jobEntity.activeStatus;
        this.companyName = jobEntity.companyName;
        this.description = jobEntity.description;
        this.maxApplications = jobEntity.maxApplications;
        this.expirationDate = jobEntity.expirationDate;
        this.recruiterId = jobEntity.recruiterId;
    };
};