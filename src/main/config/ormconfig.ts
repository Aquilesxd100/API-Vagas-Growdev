import { DataSourceOptions } from "typeorm";
import { apiEnv } from "../../app/envs/apiEnv";


const config : DataSourceOptions = {
    type: "postgres",
    url: apiEnv.dataBaseURL,
    synchronize: false,
    logging: false,
    ssl: {
        rejectUnauthorized: false
    },
    entities: [],
    migrations: []
};
export default config;