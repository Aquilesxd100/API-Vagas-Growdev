import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm"

export class ApplicationsAPITable1685468526891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'candidate_x_job_application',
            columns: [
                new TableColumn ({
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()'
                }),
                new TableColumn ({
                    name: 'application_date',
                    type: 'varchar(10)',
                    isNullable: false
                }),
                new TableColumn ({
                    name: 'approval',
                    type: 'boolean',
                    isNullable: true
                }),
                new TableColumn ({
                    name: 'candidate_id',
                    type: 'uuid',
                    isNullable: false
                }),
                new TableColumn ({
                    name: 'job_id',
                    type: 'uuid',
                    isNullable: false
                })
            ],
            foreignKeys: [
                {
                    columnNames: ['candidate_id'],
                    referencedTableName: 'candidates',
                    referencedColumnNames: ['id']
                },
                {
                    columnNames: ['job_id'],
                    referencedTableName: 'jobs',
                    referencedColumnNames: ['id']
                }
            ]
        }));

        await queryRunner.query(`
            CREATE INDEX idx_approval ON candidate_x_job_application(approval);
        `);
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX idx_approval;
        `);

        await queryRunner.dropTable('candidate_x_job_application');
    };

}
