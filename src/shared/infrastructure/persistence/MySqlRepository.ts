import { createPool, Pool } from 'mysql2/promise';
import IRepository from './IRepository';

export class MySqlRepository implements IRepository {

    static connection: Pool;

    constructor() {}


    static async connect(): Promise<Pool> {
        if(!this.connection) {
            this.connection = await createPool({
                // host: 'localhost',
                // user: 'root',
                // password: '123',
                // database: 'db_agendaaizama'
                host: 'www.agendaaizama.net',
                user: 'agendaaizama_bdd_admin',
                password: 'admin160597',
                database: 'agendaaizama_bdd'
            });
        }
        return this.connection;
    }

    async executeSqlStatement(sqlStatement: string): Promise<any> {
        await MySqlRepository.connect();
        const [rows, cols] = await MySqlRepository.connection.query({ sql: sqlStatement});
        return rows[0] == null? null: JSON.parse(JSON.stringify(rows[0]));
    }

    async executeSelect(sqlStatement: string): Promise<any> {
        await MySqlRepository.connect();
        const [rows, cols] = await MySqlRepository.connection.query({ sql: sqlStatement});
        return rows[0] == null? null: JSON.parse(JSON.stringify(rows));
    }

    async executeSelectWithParams(sqlStatement: string, args: string[]): Promise<any> {
        await MySqlRepository.connect();
        const [rows, cols] = await MySqlRepository.connection.query(sqlStatement, args);
        return rows[0] == null? null: JSON.parse(JSON.stringify(rows));
    }

    async executeInsert(query: string): Promise<number> {
        await MySqlRepository.connect();
        const [result] = await MySqlRepository.connection.query({ sql: query});
        return JSON.parse(JSON.stringify(result)).affectedRows;
    }

    public async beginTransaction(): Promise<void> {
        await MySqlRepository.connect();
        await MySqlRepository.connection.query('START TRANSACTION');
    }

    async commitTransaction(): Promise<void> {
        await MySqlRepository.connect();
        await MySqlRepository.connection.query('COMMIT');
    }

    async rollbackTransaction(): Promise<void> {
        await MySqlRepository.connect();
        await MySqlRepository.connection.query('ROLLBACK');
    }
}