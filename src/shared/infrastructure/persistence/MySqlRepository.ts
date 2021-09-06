import { createPool, Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import IRepository from './IRepository';

export class MySqlRepository implements IRepository{

    static connection: Pool;

    constructor() {}

    static async connect(): Promise<Pool> {
        if(!this.connection) {
            this.connection = await createPool({
                host: 'localhost',
                user: 'root',
                password: '123',
                database: 'db_aizama'
            });
        }
        return this.connection;
    }

    async executeSqlStatement(sqlStatement: string): Promise<any> {
        await MySqlRepository.connect();
        const [rows, cols] = await MySqlRepository.connection.query({ sql: sqlStatement});
        return JSON.parse(JSON.stringify(rows[0]));
    }

    async executeInsert(query: string): Promise<number> {
        await MySqlRepository.connect();
        const [result] = await MySqlRepository.connection.query({ sql: query});
        return JSON.parse(JSON.stringify(result)).affectedRows;
    }
}