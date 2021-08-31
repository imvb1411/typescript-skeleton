import { createPool, Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import IRepository from './IRepository';

export class MySqlRepository implements IRepository{

    connection: Pool;

    constructor() {}

    private async connect(): Promise<Pool> {
        this.connection = await createPool({
            host: 'localhost',
            user: 'root',
            password: '123',
            database: 'db_aizama'
        });
        return this.connection;
    }

    async executeSqlStatement(sqlStatement: string): Promise<any> {
        await this.connect();
        const [rows, cols] = await this.connection.query({ sql: sqlStatement});
        this.connection.end();
        return JSON.parse(JSON.stringify(rows[0]));
    }

    async executeInsert(query: string): Promise<number> {
        await this.connect();
        const [result] = await this.connection.query({ sql: query});
        this.connection.end();
        return JSON.parse(JSON.stringify(result)).affectedRows;
    }
}