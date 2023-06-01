import { secretCode } from "../../../envs/authEnv";
import { UserInfosType } from "../types/types";

const jwt = require("jsonwebtoken");


export default function verifyTokenUC(token : string) : UserInfosType | undefined {
    let response : undefined | UserInfosType  = undefined;
    jwt.verify(token, secretCode, (error : any, user : any) => {
        if(error) return;
        response = {
            userId : user.userId,
            userType : user.userType
        };
    });
    return response;
};