import express from "express";
import { Application } from "express";

const cors = require("cors");

export default function serverConfig(app : Application) {
    app.use(express.json());
    app.use(cors({
        origin: "*",
        methods: ["PUT"]
    }));
};