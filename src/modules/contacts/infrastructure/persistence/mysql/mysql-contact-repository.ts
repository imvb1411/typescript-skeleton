import { UserTokenWithName, UserType } from "../../../../user-tokens/domain/user-token-entity";
import IRepository from "../../../../../shared/infrastructure/persistence/IRepository";
import { MySqlRepository } from "../../../../../shared/infrastructure/persistence/MySqlRepository";
import { ContactEntity, ContactType } from "../../../domain/contact-entity";
import { IContactRepository } from "../../../domain/contact-repository";
import * as fs from 'fs';

export class MySqlContactRepository extends MySqlRepository implements IContactRepository {

    constructor(private repository: IRepository) {
        super();
    }

    async findByUser(userId: string, userType: number): Promise<Array<ContactEntity>> {
        let contacts: Array<ContactEntity> = new Array<ContactEntity>();
        let sql: string;
        let params: string[];
        
        switch(userType) {
            case UserType.Tutor:
                sql = fs.readFileSync(__dirname + '/queries/GetTutorContacts.sql', 'utf-8');
                params = [userId]
                break;
            case UserType.Student:
                sql = fs.readFileSync(__dirname + '/queries/GetStudentContacts.sql', 'utf-8');
                params = [userId, userId, userId]
                break;
            case UserType.Teacher:
                sql = fs.readFileSync(__dirname + '/queries/GetTeacherContacts.sql', 'utf-8');
                params = [ userId, userId, userId, userId ];
                break;
            case UserType.Staff:
            case UserType.Director:
                let directorSchoolQuery = fs.readFileSync(__dirname + '/queries/GetDirectorAndStaffSchool.sql', 'utf-8');
                const directorSchool = await this.repository.executeSelectWithParams(directorSchoolQuery, [ userId ]);
                sql = fs.readFileSync(__dirname + '/queries/GetDirectorAndStaffContacts.sql', 'utf-8');
                params = [
                    directorSchool[0].cod_col
                    , directorSchool[0].cod_col
                    , directorSchool[0].cod_col
                    , directorSchool[0].cod_col];
                break;
            default:
                throw new Error("Tipo usuario no existe");
        }
        const query = await this.repository.executeSelectWithParams(sql, params);
        if (query != null) {
            query.map(function(item: { codigo: string; cod_par: number, nombre: string; tipo: number; }) {
                contacts.push(new ContactEntity(item.codigo, item.nombre, item.tipo));
            });
        }
        
        return contacts;
    }
    
    async findGroupForTutor(deviceFromId: string, destinationId: string): Promise<Array<UserTokenWithName>> {
        let tokens: Array<UserTokenWithName> = new Array<UserTokenWithName>();
        let getTokens = fs.readFileSync(__dirname + '/queries/group-members/GetTokensGroupForTutor.sql', 'utf-8');
        
        let query = await this.repository.executeSelectWithParams(getTokens, [ deviceFromId, destinationId, deviceFromId, deviceFromId ]);
        if (query != null) {
            query.map(function(item) {
                tokens.push(Object.assign(new UserTokenWithName,JSON.parse(JSON.stringify(item))));
            });
        }
        return tokens;
    }

    async findGroupForStudent(deviceFromId: string, destinationId: string): Promise<Array<UserTokenWithName>> {
        let tokens: Array<UserTokenWithName> = new Array<UserTokenWithName>();
        let getTokens = fs.readFileSync(__dirname + '/queries/group-members/GetTokensGroupForStudent.sql', 'utf-8');
        let query = await this.repository.executeSelectWithParams(getTokens, [ deviceFromId, deviceFromId ]);
        if (query != null) {
            query.map(function(item) {
                tokens.push(Object.assign(new UserTokenWithName,JSON.parse(JSON.stringify(item))));
            });
        }
        return tokens;
    }

    async findGroupForTeacher(deviceFromId: string, destinationId: string, destinationType: number): Promise<Array<UserTokenWithName>> {
        let tokens: Array<UserTokenWithName> = new Array<UserTokenWithName>();
        let getTokens: string = "";
        let params: string[];
        if (destinationType == ContactType.Course) {
            getTokens = fs.readFileSync(__dirname + '/queries/group-members/GetTokensGroupForTeacherToCourseStudents.sql', 'utf-8');
            params = [ 
                destinationId
                , destinationId
                , deviceFromId
                , destinationId
            ]
        } else if (destinationType == ContactType.CourseWithTutors) {
            getTokens = fs.readFileSync(__dirname + '/queries/group-members/GetTokensGroupForTeacherToCourseTutors.sql', 'utf-8');
            params = [ 
                destinationId
                , destinationId
                , deviceFromId
                , destinationId
            ]
        } else if (destinationType == ContactType.TeacherAndDirectorGroup) {
            getTokens = fs.readFileSync(__dirname + '/queries/group-members/GetTokensGroupForTeacherToGroupSchool.sql', 'utf-8');
            params = [ 
                destinationId
                , deviceFromId
                , destinationId
            ]
        }

        if (getTokens.length > 0) {
            let query = await this.repository.executeSelectWithParams(getTokens, params);
            if (query != null) {
                query.map(function(item) {
                    tokens.push(Object.assign(new UserTokenWithName,JSON.parse(JSON.stringify(item))));
                });
            }
        }
        
        return tokens;
    }

    async findGroupForDirector(deviceFromId: string, destinationId: string): Promise<Array<UserTokenWithName>> {
        let tokens: Array<UserTokenWithName> = new Array<UserTokenWithName>();
        let getTokens: string = fs.readFileSync(__dirname + '/queries/group-members/GetTokensGroupForDirector.sql', 'utf-8');
        let query = await this.repository.executeSelectWithParams(getTokens, [destinationId, deviceFromId, destinationId]);
        if (query != null) {
            query.map(function(item) {
                tokens.push(Object.assign(new UserTokenWithName,JSON.parse(JSON.stringify(item))));
            });
        }
        return tokens;
    }
}