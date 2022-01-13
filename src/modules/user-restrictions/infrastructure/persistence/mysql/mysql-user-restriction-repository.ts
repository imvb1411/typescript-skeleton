import { IUserRestrictionRepository } from "./../../../domain/user-restriction-repository";
import { MySqlRepository } from "./../../../../../shared/infrastructure/persistence/MySqlRepository";
import IRepository from "./../../../../../shared/infrastructure/persistence/IRepository";
import { UserRestrictionEntity } from "./../../../domain/user-restriction-entity";
import moment from "moment";

export class MySqlUserRestrictionRepository extends MySqlRepository implements IUserRestrictionRepository {
        
    constructor(private repository: IRepository) {
        super();
    }

    async save(userRestrictionEntity: UserRestrictionEntity): Promise<number> {
        var sql = "insert into UserRestrictions values('" + userRestrictionEntity.id + "'," 
                                                    + "'" + userRestrictionEntity.userRestricted + "'," 
                                                    + userRestrictionEntity.restrictionType + "," 
                                                    + "'" + userRestrictionEntity.userId + "',"
                                                    + userRestrictionEntity.userType + "," 
                                                    + userRestrictionEntity.state + ","
                                                    + "'" + moment(userRestrictionEntity.createdAt).format("yyyy-MM-DD HH:mm:ss") + "'," 
                                                    + null
                                                    + ");"
        let query = await this.repository.executeInsert(sql);
        return query;
    }

    async delete(id: string, updatedAt: Date): Promise<number> {
        var sql = "update UserRestrictions set state = 0, updatedAt = '" + moment(updatedAt).format("yyyy-MM-DD HH:mm:ss") + "' where id = '" + id + "';";
        let query = await this.repository.executeInsert(sql);
        return query;
    }

    async existsRestrictionById(id: string): Promise<UserRestrictionEntity> {
        let result: UserRestrictionEntity = null;
        let sql = "select id, userRestricted, restrictionType, userId, userType, state, createdAt, updatedAt from UserRestrictions where " +
            "id = '" + id + "' and state = 1;";
        let query = await this.repository.executeSelect(sql);
        if(query != null) {
            result = Object.assign(new UserRestrictionEntity,JSON.parse(JSON.stringify(query[0])));
        }
        return result;
    }

    async existsRestriction(userRestricted: string, restrictionType: number, userId: string, userType: number): Promise<UserRestrictionEntity> {
        let result: UserRestrictionEntity = null;
        let sql = "select id, userRestricted, restrictionType, userId, userType, state, createdAt, updatedAt from UserRestrictions where state = 1 and " +
            "userRestricted = '" + userRestricted + "' and restrictionType = " + restrictionType + " and userId = '" + userId + "' and userType = " + userType + ";";
        let query = await this.repository.executeSelect(sql);
        if(query != null) {
            result = Object.assign(new UserRestrictionEntity,JSON.parse(JSON.stringify(query[0])));
        }
        return result;
    }

    async findRestrictions(userId: string, destinationId: string, destinationType: number): Promise<Array<UserRestrictionEntity>> {
        let restrictions: Array<UserRestrictionEntity> = new Array<UserRestrictionEntity>();
        let sql = "select id, userRestricted, restrictionType, userId, userType, state, createdAt, updatedAt from UserRestrictions where state = 1 and " +
            "userRestricted = '" + userId + "' and userId = '" + destinationId + "' and userType = " + destinationType + ";";
        console.log(sql);
        let query = await this.repository.executeSelect(sql);
        if (query != null) {
            query.map(function(item) {
                restrictions.push(Object.assign(new UserRestrictionEntity,JSON.parse(JSON.stringify(item))));
            });
        }
        return restrictions;
    }
    
}