import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
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
    @OneToOne(() => CandidateEntity)
    @JoinColumn({ name: 'candidate_id', referencedColumnName: 'id' })
    candidate? : CandidateEntity;

    @Column({ name: 'job_id' })
    jobId?: string;
    @OneToOne(() => JobEntity)
    @JoinColumn({ name: 'job_id', referencedColumnName: 'id' })
    job? : JobEntity;

};