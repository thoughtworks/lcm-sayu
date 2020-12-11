import {MigrationInterface, QueryRunner} from "typeorm";

export class UserStatusField1607727009487 implements MigrationInterface {
    name = 'UserStatusField1607727009487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "allowed_users"
            ADD "status" text NOT NULL
            CONSTRAINT default_status DEFAULT 'activo'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "allowed_users" DROP COLUMN "status"
        `);
    }
}
