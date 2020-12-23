import {MigrationInterface, QueryRunner} from "typeorm";

export class creationDateIndex1608666235798 implements MigrationInterface {
    name = 'creationDateIndex1608666235798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_cad39e0f746139cc27f8c34555" ON "registry" ("creationDate")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_cad39e0f746139cc27f8c34555"
        `);
    }

}
