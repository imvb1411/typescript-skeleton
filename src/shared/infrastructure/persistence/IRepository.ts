export default interface IRepository {
    executeSelect(sqlStatement: string): Promise<any>;
    executeSqlStatement(sqlStatement: string): Promise<any>;
    executeInsert(query: string): Promise<any>;
    beginTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
}