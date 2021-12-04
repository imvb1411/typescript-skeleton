import { TokenEntity } from "./../../domain/token-entity";
import { TokenForCreation } from "./../../domain/token-for-creation";
import { TokenForUpdate } from "./../../domain/token-for-update";
import { ITokenRepository } from "./../../domain/token-repository";
import moment from "moment";
import IRepository from "./../../../../shared/infrastructure/persistence/IRepository";
import { MySqlRepository } from "./../../../../shared/infrastructure/persistence/MySqlRepository";

export class MySqlTokenRepository extends MySqlRepository implements ITokenRepository {

    private readonly tableName: string = "UserToken";
    constructor(private repository: IRepository) {
        super();
    }

    async save(token: TokenForCreation): Promise<number> {
        var sql = "insert into Token (id, userId, firebaseToken, status, createdAt) values ('" 
                                        + token.id + "',"
                                        + token.userId + ",'" 
                                        + token.firebaseToken + "'," 
                                        + token.status + ",'" 
                                        + moment(token.createdAt).format("yyyy-MM-DD HH:mm:ss") + "');"
        const affectedRows = await this.repository.executeInsert(sql);
        return affectedRows;
    }

    async update(token: TokenForUpdate): Promise<number> {
        var sql = "update Token set status = " 
                + token.status 
                + ", updatedAt = '" 
                + moment(token.updatedAt).format("yyyy-MM-DD HH:mm:ss") 
                + "' where id = '" + token.id + "';"                            
        const affectedRows = await this.repository.executeInsert(sql);
        return affectedRows;
    }

    async findTokenByUserId(userId: string, userType: number): Promise<TokenEntity> {
        let tokenEntity: TokenEntity = null;
        let sql = "select id, userId, firebaseToken, status, createdAt, updatedAt from Token where status = 1 and userId = '" + userId + "' and userType = " + userType + ";";
        console.log(sql);
        const query = await this.repository.executeSqlStatement(sql);
        console.log(query);
        if(query != null) {
            tokenEntity = TokenEntity.fromPrimitive(query);
        }
        return tokenEntity;
    }
    
    async findTokenByGroupId(groupId: string): Promise<TokenEntity[]> {
        let tokens: TokenEntity[];
        let sql = "SELECT "
        return null;
    }
}
