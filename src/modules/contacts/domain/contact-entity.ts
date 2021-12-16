import { UserType } from "./../../token/domain/token-entity";

export class ContactEntity {
    id: string;
    name: string;
    typeContact: UserType;

    constructor(id: string, name: string, typeContact: UserType) {
        this.id = id;
        this.name = name;
        this.typeContact = typeContact;
    }
}