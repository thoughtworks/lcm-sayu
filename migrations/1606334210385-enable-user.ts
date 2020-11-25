import {MigrationInterface, QueryRunner} from "typeorm";

export class enableUser1606334210385 implements MigrationInterface {
    name = 'enableUser1606334210385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "allowed_users" (
                "id" SERIAL NOT NULL,
                "email" text NOT NULL,
                "role" text NOT NULL,
                "createdAt" TIMESTAMP NOT NULL,
                CONSTRAINT "UQ_914a1e30803bf54ccb355fa6808" UNIQUE ("email"),
                CONSTRAINT "PK_b2bf805db25ec806d5c1c14619d" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "allowed_users"
        `);
    }

}
