import express from "express";
import { apiEnv } from "./app/envs/apiEnv";

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["PUT"]
}));

app.listen(
    apiEnv.port, () => console.log(`Aplicacao ativa na porta ${apiEnv.port}.`)
);