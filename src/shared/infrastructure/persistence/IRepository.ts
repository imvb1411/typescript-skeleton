import { Query } from 'mysql2';

export default interface IRepository {
    executeSqlStatement(sqlStatement: string): Promise<any>;
    executeInsert(query: string): Promise<any>;
}