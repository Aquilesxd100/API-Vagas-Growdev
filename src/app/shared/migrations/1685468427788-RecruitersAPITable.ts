import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm"

export class RecruitersAPITable1685468427788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'recruiters',
            columns: [
                new TableColumn ({
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()'
                }),
                new TableColumn ({
                    name: 'name',
                    type: 'varchar(50)',
                    isNullable: false
                }),
                new TableColumn ({
                    name: 'username',
                    type: 'varchar(25)',
                    isNullable: false,
                    isUnique: true
                }),
                new TableColumn ({
                    name: 'password',
                    type: 'varchar(25)',
                    isNullable: false
                }),
                new TableColumn ({
                    name: 'company_name',
                    type: 'varchar(35)',
                    isNullable: false
                })
            ]
        }))
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('recruiters');
    };

};
