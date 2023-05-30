import { UserInfosType } from "../../../models/types";
import { secretCode } from "../../../envs/authEnv";

const jwt = require("jsonwebtoken");

export default function newTokenGenerator(userInfos: UserInfosType) : string {
    const acessToken : string = jwt.sign(userInfos, secretCode, { expiresIn: "15d" });
    return acessToken;
};