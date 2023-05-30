import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

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
};