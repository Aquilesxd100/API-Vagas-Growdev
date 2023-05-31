import { adminRepository } from "../../admin/repositorie/adminTypeOrmRepository";
import { candidateRepository } from "../../candidate/repositorie/candidateTypeOrmRepository";

export default async function validUserName
(userName : string, accountType : "admin" | "candidate") : Promise<true | string> {
    if (userName.length < 5 || userName.length > 25) {
        return "O username deve ter ao menos 5 caracteres e no máximo 25."
    };
    switch(accountType) {
        case "admin":
            if (await adminRepository.getAdminByUserName(userName)) {
                return "Esse username já está em uso."
            };
        break;
        case "candidate":
            if (await candidateRepository.getCandidateByUserName(userName)) {
                return "Esse username já está em uso."
            };
        break;
    };
    return true;
};