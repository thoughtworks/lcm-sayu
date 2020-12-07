import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNameToAllowedUsers1607352988414 implements MigrationInterface {
    name = 'AddNameToAllowedUsers1607352988414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "allowed_users"
            ADD "name" text
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "allowed_users" DROP COLUMN "name"
        `);
    }

}
