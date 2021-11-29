import IRepository from "./../../../shared/infrastructure/persistence/IRepository";
import { MySqlRepository } from "./../../../shared/infrastructure/persistence/MySqlRepository";
import { IUserRepository } from "../domain/user-repository";
import { UserEntity } from "../domain/user-entity";
import { UserForUpdate } from "../domain/user-for-update";

export class MySqlUserRepository extends MySqlRepository implements IUserRepository {

    constructor(private repository: IRepository) {
        super();
    }
    

    async save(user: UserEntity): Promise<number> {
        var sql = "insert into User (id,name) values ('" 
                                        + user.id + "'"
                                        + ",'" + user.name + "'); "
        const affectedRows = await this.repository.executeInsert(sql);
        return affectedRows;
    }

    async update(userForUpdate: UserForUpdate): Promise<number> {
        var sql = "update User set name = '" + userForUpdate.name + "' where id = '" + userForUpdate.id + "';";
        const affectedRows = await this.repository.executeInsert(sql);
        return affectedRows;
    }

    async findById(id: string): Promise<UserEntity> {
        var user: UserEntity = null;
        let sql = "select id, name from User where id = '" + id + "' ;";
        const query = await this.repository.executeSqlStatement(sql);
        if (query != null) {
            user = new UserEntity(query.id, query.name);
        }
        return user;
    }

}