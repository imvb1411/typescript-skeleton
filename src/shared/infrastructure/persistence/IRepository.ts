export interface IRepository {
    executeSelect(sqlStatement: string): Promise<any>;
    executeSelectWithParams(sqlStatement: string, args: string[]): Promise<any>;
    executeSqlStatement(sqlStatement: string): Promise<any>;
    executeInsert(query: string): Promise<any>;
    beginTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
}