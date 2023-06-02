import { DataSource } from "typeorm";
import config from "../../../main/config/ormconfig";
import initializeRepositories from "./initializeRepositories";

export const pgHelper = {
    client: null as unknown as DataSource,
    async connect(): Promise<void> {
        this.client = new DataSource(config);
        await this.client.initialize();
        initializeRepositories();
    },
    async disconnect(): Promise<void> {
        await this.client.destroy();
        this.client = null as any;
    }
};