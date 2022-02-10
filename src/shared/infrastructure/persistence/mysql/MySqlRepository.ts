import { Pool } from 'mysql2/promise';
import { IRepository } from '../IRepository';

export class MySqlRepository implements IRepository {

    constructor(private connection: Promise<Pool>) { }

    getConnection(): Promise<Pool> {
        return this.connection;
    }

    async executeSqlStatement(sqlStatement: string): Promise<any> {
        const connection: Pool = await this.getConnection();
        const [rows, cols] = await connection.query({ sql: sqlStatement});
        return rows[0] == null? null: JSON.parse(JSON.stringify(rows[0]));
    }

    async executeSelect(sqlStatement: string): Promise<any> {
        const connection: Pool = await this.getConnection();
        const [rows, cols] = await connection.query({ sql: sqlStatement});
        return rows[0] == null? null: JSON.parse(JSON.stringify(rows));
    }

    async executeSelectWithParams(sqlStatement: string, args: string[]): Promise<any> {
        const connection: Pool = await this.getConnection();
        const [rows, cols] = await connection.query(sqlStatement, args);
        return rows[0] == null? null: JSON.parse(JSON.stringify(rows));
    }

    async executeInsert(query: string): Promise<number> {
        const connection: Pool = await this.getConnection();
        const [result] = await connection.query({ sql: query});
        return JSON.parse(JSON.stringify(result)).affectedRows;
    }

    public async beginTransaction(): Promise<void> {
        const connection: Pool = await this.getConnection();
        await connection.query('START TRANSACTION');
    }

    async commitTransaction(): Promise<void> {
        const connection: Pool = await this.getConnection();
        await connection.query('COMMIT');
    }

    async rollbackTransaction(): Promise<void> {
        const connection: Pool = await this.getConnection();
        await connection.query('ROLLBACK');
    }
}