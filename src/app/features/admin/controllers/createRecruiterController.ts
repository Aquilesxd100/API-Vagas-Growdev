import { Response, Request } from "express";
import { newRecruiterInfosType } from "../types/types";
import createRecruiterUC from "../usecases/createRecruiterUC";
import checkUserType from "../../../shared/validators/checkUserType";

export default async function createRecruiterController
(req : Request, res : Response) {
    try {
        const { username, password, name, companyName } = req.body;
        const loggedUserInfos = req.body.loggedUserInfos;
        
        checkUserType(loggedUserInfos.userType, "admin");

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
        if (error.code) {
            return res.status(error.code).send({
                message: error.message
            });
        };
        return res.status(400).send({
            message: "Erro!"
        });
    };
};