import {MigrationInterface, QueryRunner} from "typeorm";

export class constipacionToDeposicion1606948507670 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE 
                "symptom"
            SET 
                name='Deposiciones'
            WHERE 
                name='Constipación'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE 
                "symptom"
            SET 
                name='Constipación'
            WHERE 
                name='Deposiciones'
        `);
    }

}
