import { UserType } from "../../../../user-tokens/domain/user-token-entity";
import IRepository from "../../../../../shared/infrastructure/persistence/IRepository";
import { MySqlRepository } from "../../../../../shared/infrastructure/persistence/MySqlRepository";
import { ContactEntity } from "../../../domain/contact-entity";
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
                let courseAndParalelSql = fs.readFileSync(__dirname + '\\queries\\GetTutorCoursesAndParalels.sql', 'utf-8');
                const courseAndParalel = await this.repository.executeSelectWithParams(courseAndParalelSql, [ userId ]);
                sql = fs.readFileSync(__dirname + '\\queries\\GetTutorContacts.sql', 'utf-8');
                params = [
                    courseAndParalel[0].cod_par
                    , courseAndParalel[0].cod_cur
                    , courseAndParalel[0].cod_col
                    , courseAndParalel[0].cod_par
                    , courseAndParalel[0].cod_cur
                    , userId
                    , courseAndParalel[0].cod_par
                    , courseAndParalel[0].cod_cur
                    , courseAndParalel[0].cod_col ]
                break;
            case UserType.Student:
                sql = fs.readFileSync(__dirname + '\\queries\\GetStudentContacts.sql', 'utf-8');
                params = [userId, userId, userId]
                break;
            case UserType.Teacher:
                sql = fs.readFileSync(__dirname + '\\queries\\GetTeacherContacts.sql', 'utf-8');
                params = [ userId, userId, userId ];
                break;
            case UserType.Staff:
            case UserType.Director:
                let directorSchoolQuery = fs.readFileSync(__dirname + '\\queries\\GetDirectorAndStaffSchool.sql', 'utf-8');
                const directorSchool = await this.repository.executeSelectWithParams(directorSchoolQuery, [ userId ]);
                sql = fs.readFileSync(__dirname + '\\queries\\GetDirectorAndStaffContacts.sql', 'utf-8');
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
        query.map(function(item: { codigo: string; cod_par: number, nombre: string; tipo: number; }) {
            contacts.push(new ContactEntity(item.codigo, item.nombre, item.tipo));
        });
        return contacts;
    }
    
}