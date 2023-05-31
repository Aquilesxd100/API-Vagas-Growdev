export interface UserInfosType {
    userId : string,
    userType : "admin" | "candidate" | "recruiter"
};
export interface newAccountType {
    name : string,
    username : string,
    password : string,
    accountType : "admin" | "candidate"
};