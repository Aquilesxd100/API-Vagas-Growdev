import express from "express";
import { apiEnv } from "./app/envs/apiEnv";
import { pgHelper } from "./app/shared/helpers/pgHelper";

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["PUT"]
}));

const port = apiEnv.port || 4000;

pgHelper.connect()
    .then(() => {
        app.listen(port, () =>
            console.log(`API Ativa e rodando na porta ${port}`)
        );
    }).catch((err) => console.log(err));
