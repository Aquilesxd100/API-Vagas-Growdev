import { DataSourceOptions } from "typeorm";
import { apiEnv } from "../../app/envs/apiEnv";
import { AdminEntity } from "../../app/shared/entities/admin.entity";
import { RecruiterEntity } from "../../app/shared/entities/recruiter.entity";
import { CandidateEntity } from "../../app/shared/entities/candidate.entity";
import { JobEntity } from "../../app/shared/entities/job.entity";
import { ApplicationEntity } from "../../app/shared/entities/candidate_x_job_application.entity";
import { AdminsAPITable1685468395465 } from "../../app/shared/migrations/1685468395465-AdminsAPITable";
import { RecruitersAPITable1685468427788 } from "../../app/shared/migrations/1685468427788-RecruitersAPITable";
import { CandidatesAPITable1685468455687 } from "../../app/shared/migrations/1685468455687-CandidatesAPITable";
import { JobsAPITable1685468469368 } from "../../app/shared/migrations/1685468469368-JobsAPITable";
import { ApplicationsAPITable1685468526891 } from "../../app/shared/migrations/1685468526891-ApplicationsAPITable";


const config : DataSourceOptions = {
    type: "postgres",
    url: apiEnv.dataBaseURL,
    synchronize: false,
    logging: false,
    ssl: {
        rejectUnauthorized: false
    },
    entities: [AdminEntity, RecruiterEntity, CandidateEntity, JobEntity, ApplicationEntity],
    migrations: [AdminsAPITable1685468395465, RecruitersAPITable1685468427788, CandidatesAPITable1685468455687, JobsAPITable1685468469368, ApplicationsAPITable1685468526891]
};

export default config;