import { DataSourceOptions } from "typeorm";
import { apiEnv } from "../../app/envs/apiEnv";
import { AdminEntity } from "../../app/shared/entities/admin.entity";
import { RecruiterEntity } from "../../app/shared/entities/recruiter.entity";
import { CandidateEntity } from "../../app/shared/entities/candidate.entity";
import { JobEntity } from "../../app/shared/entities/job.entity";
import { ApplicationEntity } from "../../app/shared/entities/candidate_x_job_application.entity";


const config : DataSourceOptions = {
    type: "postgres",
    url: apiEnv.dataBaseURL,
    synchronize: false,
    logging: false,
    ssl: {
        rejectUnauthorized: false
    },
    entities: [AdminEntity, RecruiterEntity, CandidateEntity, JobEntity, ApplicationEntity],
    migrations: []
};
export default config;