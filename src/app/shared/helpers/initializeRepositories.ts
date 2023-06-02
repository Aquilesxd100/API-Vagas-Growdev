import { adminRepository } from "../../features/admin/repositorie/adminTypeOrmRepository";
import { candidateRepository } from "../../features/candidate/repositorie/candidateTypeOrmRepository";
import { recruiterRepository } from "../../features/recruiter/repositorie/recruiterTypeOrmRepository";
import { applicationRepository } from "../repositories/applicationsTypeOrmRepository";
import { jobsRepository } from "../repositories/jobsTypeOrmRepository";


export default function initializeRepositories() {
    candidateRepository.initializeRepository();
    adminRepository.initializeRepository();  
    recruiterRepository.initializeRepository();  
    jobsRepository.initializeRepository();
    applicationRepository.initializeRepository();   
};