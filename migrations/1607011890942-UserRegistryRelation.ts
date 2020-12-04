import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRegistryRelation1607011890942 implements MigrationInterface {
    name = 'UserRegistryRelation1607011890942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "registry"
            ADD "userId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "registry"
            ADD CONSTRAINT "FK_2449b2493e4b436fda3c21ba5df" FOREIGN KEY ("userId") REFERENCES "allowed_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "registry" DROP CONSTRAINT "FK_2449b2493e4b436fda3c21ba5df"
        `);
        await queryRunner.query(`
            ALTER TABLE "registry" DROP COLUMN "userId"
        `);
    }

}
