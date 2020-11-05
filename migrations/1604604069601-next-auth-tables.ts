import {MigrationInterface, QueryRunner} from "typeorm";

export class nextAuthTables1604604069601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE accounts (
                id                   SERIAL,
                compound_id          VARCHAR(255) NOT NULL,
                user_id              INTEGER NOT NULL,
                provider_type        VARCHAR(255) NOT NULL,
                provider_id          VARCHAR(255) NOT NULL,
                provider_account_id  VARCHAR(255) NOT NULL,
                refresh_token        TEXT,
                access_token         TEXT,
                access_token_expires TIMESTAMPTZ,
                created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE sessions (
                id            SERIAL,
                user_id       INTEGER NOT NULL,
                expires       TIMESTAMPTZ NOT NULL,
                session_token VARCHAR(255) NOT NULL,
                access_token  VARCHAR(255) NOT NULL,
                created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE users (
                id             SERIAL,
                name           VARCHAR(255),
                email          VARCHAR(255),
                email_verified TIMESTAMPTZ,
                image          VARCHAR(255),
                created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE verification_requests (
                id         SERIAL,
                identifier VARCHAR(255) NOT NULL,
                token      VARCHAR(255) NOT NULL,
                expires    TIMESTAMPTZ NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX compound_id
                ON accounts(compound_id);
        `);

        await queryRunner.query(`
            CREATE INDEX provider_account_id
                ON accounts(provider_account_id);
        `);

        await queryRunner.query(`
            CREATE INDEX provider_id
                ON accounts(provider_id);
        `);

        await queryRunner.query(`
            CREATE INDEX user_id
                ON accounts(user_id);
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX session_token
                ON sessions(session_token);
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX access_token
                ON sessions(access_token);
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX email
                ON users(email);
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX token
                ON verification_requests(token);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP INDEX token;');
        await queryRunner.query('DROP INDEX email;');
        await queryRunner.query('DROP INDEX access_token;');
        await queryRunner.query('DROP INDEX session_token;');
        await queryRunner.query('DROP INDEX user_id;');
        await queryRunner.query('DROP INDEX provider_id;');
        await queryRunner.query('DROP INDEX provider_account_id;');
        await queryRunner.query('DROP INDEX compound_id;');
        await queryRunner.query('DROP TABLE verification_requests;');
        await queryRunner.query('DROP TABLE users;');
        await queryRunner.query('DROP TABLE sessions;');
        await queryRunner.query('DROP TABLE accounts;');
    }

}
