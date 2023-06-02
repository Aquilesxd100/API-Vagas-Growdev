import { Request, Response, NextFunction } from "express";

export default function validJobsQueriesMiddleware
(req: Request, res : Response, next: NextFunction) {
    let { date, recruiter, active, full, empty, search } = req.query;
    const queriesArray = [date, recruiter, active, full, empty, search];
    
    if (queriesArray.some((query) => typeof query !== "undefined" && typeof query !== "string")) {
        return res.status(400).send({
            message: "Tipo de uma ou mais queries inválida."
        })
    };
    next()
};