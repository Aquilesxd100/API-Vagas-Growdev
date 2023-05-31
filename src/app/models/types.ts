import { AdminEntity } from "../shared/entities/admin.entity"
import { CandidateEntity } from "../shared/entities/candidate.entity"
import { RecruiterEntity } from "../shared/entities/recruiter.entity"



export interface UserInfosType {
    userId : string,
    userType : "admin" | "candidate" | "recruiter"
};
export interface LogInAccountType extends UserInfosType {
    user : CandidateEntity | RecruiterEntity | AdminEntity | null
};
export interface newAccountType {
    name : string,
    username : string,
    password : string,
    accountType : "admin" | "candidate"
};