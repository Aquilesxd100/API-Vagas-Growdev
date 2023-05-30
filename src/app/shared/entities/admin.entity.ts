import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'admins' })
export class AdminEntity extends BaseEntity {
    @PrimaryColumn({ name: 'id' })
    id?: string;

    @Column({ name: 'name' })
    name?: string;

    @Column({ name: 'username' })
    userName?: string;

    @Column({ name: 'password' })
    password?: string;
};