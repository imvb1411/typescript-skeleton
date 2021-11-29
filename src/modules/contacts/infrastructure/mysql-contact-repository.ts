import IRepository from "./../../../shared/infrastructure/persistence/IRepository";
import { MySqlRepository } from "./../../../shared/infrastructure/persistence/MySqlRepository";
import { ContactEntity } from "./../domain/contact-entity";
import { IContactRepository } from "./../domain/contact-repository";

export class MySqlContactRepository extends MySqlRepository implements IContactRepository {

    constructor(private repository: IRepository) {
        super();
    }

    async findByUserId(userId: number): Promise<Array<ContactEntity>> {
        let contacts: Array<ContactEntity> = new Array<ContactEntity>();
        let sql = "call proc_chat_contactos_by_tutor(" + userId + ");";
        const query = await this.repository.executeSelect(sql);
        query[1].map(function(item: { codigo: string; cod_par: number, nombre: string; tipo: number; }) {
            contacts.push(new ContactEntity(item.codigo, item.nombre, item.tipo));
        });
        return contacts;
    }
    
}