import {MigrationInterface, QueryRunner} from "typeorm";

export class firstUser1606751238303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "allowed_users" (
                "email",
                "role",
                "createdAt"
            ) VALUES (
                'tratantesayu@gmail.com',
                'tratante',
                current_timestamp
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM 
                "allowed_users"
            WHERE 
                "email" = 'tratantesayu@gmail.com'
        `);
    }

}
