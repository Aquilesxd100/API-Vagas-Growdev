import { NextFunction, Request, Response } from "express";
import validDateFormat from "../../../../shared/validators/validDateFormat";
import isExpiredDateCheck from "../../../../shared/helpers/isExpiredDateCheck";
import getCurrentDate from "../../../../shared/helpers/getCurrentDate";

export default function validCreateJobInfos(req : Request, res : Response, next : NextFunction) {
    const { description, companyName, expirationDate, maxApplications } = req.body;
    const infosStringArray = [description, companyName, expirationDate];

    if (infosStringArray.some((info) => typeof info === "undefined")) {
        return res.status(400).send({
            message: "Por favor informe uma description, companyName e expirationDate para a vaga."
        });
    };

    if (infosStringArray.some((info) => typeof info !== "string")) {
        return res.status(400).send({
            message: "Tipo de uma ou mais informações inválida(s)."
        });
    };

    if (maxApplications !== undefined && typeof maxApplications !== "number" && maxApplications !== null) {
        return res.status(400).send({
            message: "O valor de maxApplications precisa ser um número ou nulo."
        });
    };
    if (maxApplications <= 0) {
        return res.status(400).send({
            message: "O valor de maxApplications deve ser de 1 ou maior."
        });
    };

    if (!validDateFormat(expirationDate)) {
        return res.status(400).send({
            message: "Por favor informe um valor de expirationDate válido. (Ex: 22/04/2023)"
        }); 
    };

    const currentDate = getCurrentDate();
    if (isExpiredDateCheck(currentDate, expirationDate)) {
        return res.status(400).send({
            message: "Por favor informe uma data válida."
        }); 
    };

    next();
};