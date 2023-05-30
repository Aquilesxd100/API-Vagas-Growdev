import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm"

export class JobsAPITable1685468469368 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'jobs',
            columns: [
                new TableColumn ({
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()'
                }),
                new TableColumn ({
                    name: 'description',
                    type: 'varchar(125)',
                    isNullable: false
                }),
                new TableColumn ({
                    name: 'company_name',
                    type: 'varchar(35)',
                    isNullable: false
                }),
                new TableColumn ({
                    name: 'expiration_date',
                    type: 'varchar(10)',
                    isNullable: false
                }),
                new TableColumn ({
                    name: 'active_status',
                    type: 'boolean',
                    isNullable: false
                }),
                new TableColumn ({
                    name: 'recruiter_id',
                    type: 'uuid',
                    isNullable: false
                }),
                new TableColumn ({
                    name: 'max_applications',
                    type: 'int',
                    isNullable: true
                })
            ],
            foreignKeys: [{
                columnNames: ['recruiter_id'],
                referencedTableName: 'recruiters',
                referencedColumnNames: ['id']
            }]
        }));

        await queryRunner.query(`
            CREATE INDEX idx_active_status ON jobs(active_status);
        `);
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX idx_active_status;
        `);

        await queryRunner.dropTable('jobs');
    };

}
