import { apiEnv } from "../../app/envs/apiEnv";

const Redis = require("ioredis");

export const redis = new Redis({
    port: apiEnv.redisPort, 
    host: apiEnv.redisHost, 
    username: "default", 
    password: apiEnv.redisPassword,
    db: 0,
});


