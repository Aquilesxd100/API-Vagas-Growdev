import { Request, Response, NextFunction } from "express";
import { CandidateEntity } from "../../../../shared/entities/candidate.entity";
import { candidateRepository } from "../../../candidate/repositorie/candidateTypeOrmRepository";

export default async function validCandidateIdMiddleware
(req : Request, res: Response, next: NextFunction) {
    const userId = req.params.userid;

    if (!userId) {
        return res.status(400).send({
            message: "Informe o ID do usuário que deseja atualizar o status de candidatura."
        });
    };

    if (typeof userId !== "string") {
        return res.status(400).send({
            message: "Tipo de ID de usuário invalido."
        }); 
    };

    if (userId.length !== 36) {
        return res.status(400).send({
            message: "ID inválido."
        });
    };

    const foundCandidate : CandidateEntity | null | undefined = await candidateRepository.getCandidateById(userId);

    if (!foundCandidate) {
        return res.status(404).send({
            message: "Nenhum candidato com esse ID foi encontrado."
        }); 
    };

    req.body.currentCandidate = foundCandidate;
    next();
};