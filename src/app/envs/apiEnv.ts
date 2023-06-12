require('dotenv').config()
export const apiEnv = {
    dataBaseURL: process.env.DATA_BASE_URL,
    port: process.env.PORT,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    redisPassword: process.env.REDIS_PASSWORD
};