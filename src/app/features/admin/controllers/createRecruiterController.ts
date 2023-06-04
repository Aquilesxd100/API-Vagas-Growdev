import { Response, Request } from "express";
import { newRecruiterInfosType } from "../types/types";
import createRecruiterUC from "../usecases/createRecruiterUC";

export default async function createRecruiterController
(req : Request, res : Response) {
    try {
        const { username, password, name, companyName } = req.body;

        const newRecruiterInfos : newRecruiterInfosType = {
            name : name,
            username : username,
            password : password,
            companyName : companyName
        };
        await createRecruiterUC(newRecruiterInfos);

        return res.status(200).send({
            message: "Conta criada com sucesso!"
        })
        
    } catch(error : any) {
        if (error.statusCode) {
            return res.status(error.statusCode).send({
                message: error.message
            });
        };
        return res.status(400).send({
            message: "Erro!"
        });
    };
};