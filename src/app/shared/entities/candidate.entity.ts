import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ApplicationEntity } from "./candidate_x_job_application.entity";

@Entity({ name: 'candidates' })
export class CandidateEntity extends BaseEntity {
    @PrimaryColumn({ name: 'id' })
    id?: string;

    @Column({ name: 'name' })
    name?: string;

    @Column({ name: 'username' })
    userName?: string;

    @Column({ name: 'password' })
    password?: string;

    @OneToMany(() => ApplicationEntity, application => application.candidate)
    applications?: ApplicationEntity[]
};