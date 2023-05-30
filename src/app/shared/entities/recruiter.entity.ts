import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'recruiters' })
export class RecruiterEntity extends BaseEntity {
    @PrimaryColumn({ name: 'id' })
    id?: string;

    @Column({ name: 'name' })
    name?: string;

    @Column({ name: 'username' })
    userName?: string;

    @Column({ name: 'password' })
    password?: string;

    @Column({ name: 'company_name' })
    companyName?: string;
};