import {MigrationInterface, QueryRunner} from "typeorm";

export class RescateMigrations1606928123868 implements MigrationInterface {
    name = 'rescateMigration1606928123868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "symptom"(name) VALUES('Rescate')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DELETE FROM registry WHERE "symptomId" = (SELECT id FROM symptom where name='Rescate')`);
        await queryRunner.query(`DELETE FROM symptom WHERE name = 'Rescate'`);
    }
}


