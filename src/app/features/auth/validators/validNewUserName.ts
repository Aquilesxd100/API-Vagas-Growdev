import { adminRepository } from "../../admin/repositorie/adminTypeOrmRepository";
import { candidateRepository } from "../../candidate/repositorie/candidateTypeOrmRepository";
import { recruiterRepository } from "../../recruiter/repositorie/recruiterTypeOrmRepository"

export default async function validNewUserName
(userName : string) : Promise<true | string> {
    if (userName.length < 5 || userName.length > 25) {
        return "O username deve ter ao menos 5 caracteres e no máximo 25."
    };
    
    let checkSameUsername : boolean = false;
    if (
       await candidateRepository.getCandidateByUserName(userName) 
    || await recruiterRepository.getRecruiterByUserName(userName)
    || await adminRepository.getAdminByUserName(userName)
    ) {
        checkSameUsername = true;  
    };

    if (checkSameUsername) {
        return "Esse username já está em uso."
    };
    return true;
};