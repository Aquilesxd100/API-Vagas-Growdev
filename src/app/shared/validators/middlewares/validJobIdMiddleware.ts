import { Response, Request, NextFunction } from "express";
import { JobEntity } from "../../entities/job.entity";
import { jobsRepository } from "../../repositories/jobsTypeOrmRepository";

export default async function validJobIdMiddleware
(req : Request, res : Response, next : NextFunction) {
    const jobId = req.params.jobid;

    if (!jobId) {
        return res.status(400).send({
            message: "Por favor informe o ID da vaga."
        });
    };

    if (typeof jobId !== "string") {
        return res.status(400).send({
            message: "Tipo de ID inválido."
        });
    };

    if (jobId.length !== 36) {
        return res.status(400).send({
            message: "ID inválido."
        });
    };

    const job : JobEntity | undefined | null = await jobsRepository.getJobById(jobId);
    if (!job) {
        return res.status(404).send({
            message: "Vaga não encontrada."
        });
    };
    req.body.currentJob = job;

    next();
};