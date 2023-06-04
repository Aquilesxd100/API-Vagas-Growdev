import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { CandidateEntity } from "./candidate.entity";
import { JobEntity } from "./job.entity";

@Entity({ name: 'candidate_x_job_application' })
export class ApplicationEntity extends BaseEntity {
    @PrimaryColumn({ name: 'id' })
    id?: string;

    @Column({ name: 'application_date' })
    applicationDate?: string;

    @Column({ name: 'approval' })
    approval?: boolean;

    @Column({ name: 'candidate_id' })
    candidateId?: string;
    
    @ManyToOne(() => CandidateEntity, candidate => candidate.applications)
    @JoinColumn({ name: "candidate_id" })
    candidate? : CandidateEntity;

    @Column({ name: 'job_id' })
    jobId?: string;
    
    @ManyToOne(() => JobEntity, job => job.applications, {
        onDelete: "CASCADE", orphanedRowAction: 'delete'
    })
    @JoinColumn({ name: "job_id" })
    job?: JobEntity
};