import { createPool, Pool } from 'mysql2/promise';

export class MySqlConnectionFactory {

    private static clients: { [key: string]: Pool } = {};

    static async createConnection(contextName: string): Promise<Pool> {
        let connection: Pool = MySqlConnectionFactory.getClient(contextName);

        if(!connection) {
            connection = createPool({
                host: 'localhost',
                user: 'root',
                password: '123',
                database: 'db_agendaaizama'
                // host: 'www.agendaaizama.net',
                // user: 'agendaaizama_bdd_admin',
                // password: 'admin160597',
                // database: 'agendaaizama_bdd'
            });
            MySqlConnectionFactory.registerClient(connection, contextName);            
        }
        return connection;
    }

    private static registerClient(client: Pool, contextName: string): void {
        MySqlConnectionFactory.clients[contextName] = client;
    }

    private static getClient(contextName: string): Pool {
        return MySqlConnectionFactory.clients[contextName];
    }
}