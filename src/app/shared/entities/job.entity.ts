import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { RecruiterEntity } from "./recruiter.entity";

@Entity({ name: 'jobs' })
export class JobEntity extends BaseEntity {
    @PrimaryColumn({ name: 'id' })
    id?: string;

    @Column({ name: 'description' })
    description?: string;

    @Column({ name: 'company_name' })
    companyName?: string;

    @Column({ name: 'expiration_date' })
    expirationDate?: string;

    @Column({ name: 'active_status' })
    activeStatus?: boolean;

    @Column({ name: 'recruiter_id' })
    recruiterId?: string;
    @OneToOne(() => RecruiterEntity)
    @JoinColumn({ name: 'recruiter_id', referencedColumnName: 'id' })
    recruiter?: RecruiterEntity

    @Column({ name: 'max_applications' })
    maxApplications?: number;
};