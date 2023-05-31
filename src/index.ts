import express from "express";
import { apiEnv } from "./app/envs/apiEnv";
import { pgHelper } from "./app/shared/helpers/pgHelper";
import serverConfig from "./main/config/serverconfig";
import registerRoutes from "./main/server/registerRoutes";

const app = express();
const port = apiEnv.port || 4000;

pgHelper.connect()
    .then(() => {
        serverConfig(app);
        registerRoutes(app);
    })
    .then(() => {
        app.listen(port, () =>
            console.log(`API Ativa e rodando na porta ${port}`)
        );
    }).catch((err) => console.log(err));
