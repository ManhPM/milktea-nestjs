import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Database1695687633582 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
