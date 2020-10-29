import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1604002084688 implements MigrationInterface {
    name = 'firstMigration1604002084688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registry" ("id" SERIAL NOT NULL, "creationDate" TIMESTAMP NOT NULL, "value" integer NOT NULL, "symptomId" integer, CONSTRAINT "PK_2eca29d55a9556d854416df8ce5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "symptom" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_e6bf8581852864d312308633007" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "registry" ADD CONSTRAINT "FK_bf9dc96233ae8e18c3d5142c043" FOREIGN KEY ("symptomId") REFERENCES "symptom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "symptom"(name) VALUES('Fiebre')`);
        await queryRunner.query(`INSERT INTO "symptom"(name) VALUES('Constipación')`);
        await queryRunner.query(`INSERT INTO "symptom"(name) VALUES('Cansancio')`);
        await queryRunner.query(`INSERT INTO "symptom"(name) VALUES('Falta de aire')`);
        await queryRunner.query(`INSERT INTO "symptom"(name) VALUES('Dificultad para tragar')`);
        await queryRunner.query(`INSERT INTO "symptom"(name) VALUES('Apetito')`);
        await queryRunner.query(`INSERT INTO "symptom"(name) VALUES('Náusea')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registry" DROP CONSTRAINT "FK_bf9dc96233ae8e18c3d5142c043"`);
        await queryRunner.query(`DROP TABLE "symptom"`);
        await queryRunner.query(`DROP TABLE "registry"`);
    }

}
