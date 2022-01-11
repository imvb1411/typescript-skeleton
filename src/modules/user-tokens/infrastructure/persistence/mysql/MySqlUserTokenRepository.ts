import { UserTokenEntity } from "../../../domain/user-token-entity";
import { ITokenRepository } from "../../../domain/user-token-repository";
import moment from "moment";
import IRepository from "../../../../../shared/infrastructure/persistence/IRepository";
import { MySqlRepository } from "../../../../../shared/infrastructure/persistence/MySqlRepository";
import * as fs from 'fs';
import { ContactType } from "./../../../../../modules/contacts/domain/contact-entity";

export class MySqlTokenRepository extends MySqlRepository implements ITokenRepository {
        
    private readonly tableName: string = "UserToken";
    
    constructor(private repository: IRepository) {
        super();
    }

    async save(token: UserTokenEntity): Promise<number> {
        var sql = "insert into " + this.tableName + " (Id, UserId, UserType, FirebaseToken, State, CreatedAt) values ("
                                        + "default,'" 
                                        + token.userId + "','" 
                                        + token.userType + "','"
                                        + token.firebaseToken + "'," 
                                        + token.state + ",'" 
                                        + moment(token.createdAt).format("yyyy-MM-DD HH:mm:ss") + "');"
        const affectedRows = await this.repository.executeInsert(sql);
        return affectedRows;
    }

    async update(token: UserTokenEntity): Promise<number> {
        var sql = "update " + this.tableName + " set state = " 
                + token.state 
                + ", updatedAt = '" 
                + moment(token.updatedAt).format("yyyy-MM-DD HH:mm:ss") 
                + "' where id = '" + token.id + "' and userType = " + token.userType + ";"                            
        const affectedRows = await this.repository.executeInsert(sql);
        return affectedRows;
    }

    async findUserTokenByUserIdAndType(userId: string, userType: number): Promise<UserTokenEntity> {
        let tokenEntity: UserTokenEntity = null;
        let sql = "select id, userId, userType, firebaseToken, state, date_format(createdAt, '%Y-%m-%d %T') as createdAt, updatedAt" + 
                    " from " + this.tableName + " where state = 1 and userId = '" + userId + "' and userType = "+ userType + ";";
        console.log(sql);
        const query = await this.repository.executeSqlStatement(sql);

        if(query != null) {
            tokenEntity = Object.assign(new UserTokenEntity,JSON.parse(JSON.stringify(query)));
        }
        return tokenEntity;
    }

    async findUserTokenByToken(token: string): Promise<UserTokenEntity> {
        let tokenEntity: UserTokenEntity = null;
        let sql = "select id, userId, userType, firebaseToken, state, date_format(createdAt, '%Y-%m-%d %T') as createdAt, updatedAt from " + this.tableName + " where state = 1 and firebaseToken = '" + token + "';";
        const query = await this.repository.executeSqlStatement(sql);

        if(query != null) {
            tokenEntity = Object.assign(new UserTokenEntity,JSON.parse(JSON.stringify(query)));
        }
        return tokenEntity;
    }

    async findGroupForTutor(deviceFromId: string, destinationId: string): Promise<Array<UserTokenEntity>> {
        let tokens: Array<UserTokenEntity> = new Array<UserTokenEntity>();
        let getTokens = fs.readFileSync(__dirname + '\\queries\\GetTokensGroupForTutor.sql', 'utf-8');
        let query = await this.repository.executeSelectWithParams(getTokens, [ deviceFromId, destinationId, deviceFromId, deviceFromId ]);
        query.map(function() {
            tokens.push(Object.assign(new UserTokenEntity,JSON.parse(JSON.stringify(query))));
        });
        return tokens;
    }

    async findGroupForStudent(deviceFromId: string, destinationId: string): Promise<Array<UserTokenEntity>> {
        let tokens: Array<UserTokenEntity> = new Array<UserTokenEntity>();
        let getTokens = fs.readFileSync(__dirname + '\\queries\\GetTokensGroupForStudent.sql', 'utf-8');
        let query = await this.repository.executeSelectWithParams(getTokens, [ deviceFromId, deviceFromId ]);
        query.map(function() {
            tokens.push(Object.assign(new UserTokenEntity,JSON.parse(JSON.stringify(query))));
        });
        return tokens;
    }

    async findGroupForTeacher(deviceFromId: string, destinationId: string, destinationType: number): Promise<Array<UserTokenEntity>> {
        let tokens: Array<UserTokenEntity> = new Array<UserTokenEntity>();
        let getTokens: string = "";
        let params: string[];
        if (destinationType == ContactType.Course) {
            getTokens = fs.readFileSync(__dirname + '\\queries\\GetTokensGroupForTeacherToCourse.sql', 'utf-8');
            params = [ 
                destinationId
                , destinationId
                , deviceFromId
                , destinationId
            ]
        } else if (destinationType == ContactType.TeacherAndDirectorGroup) {
            getTokens = fs.readFileSync(__dirname + '\\queries\\GetTokensGroupForTeacherToGroupSchool.sql', 'utf-8');
            params = [ 
                destinationId
                , deviceFromId
                , destinationId
            ]
        }

        let query = await this.repository.executeSelectWithParams(getTokens, params);
        query.map(function() {
            tokens.push(Object.assign(new UserTokenEntity,JSON.parse(JSON.stringify(query))));
        });
        return tokens;
    }

    async findGroupForDirector(deviceFromId: string, destinationId: string): Promise<Array<UserTokenEntity>> {
        let tokens: Array<UserTokenEntity> = new Array<UserTokenEntity>();
        let getTokens: string = fs.readFileSync(__dirname + '\\queries\\GetTokensGroupForDirector.sql', 'utf-8');
        let query = await this.repository.executeSelectWithParams(getTokens, [destinationId, deviceFromId, destinationId]);
        query.map(function() {
            tokens.push(Object.assign(new UserTokenEntity,JSON.parse(JSON.stringify(query))));
        });
        return tokens;
    }
}
