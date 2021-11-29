export class ContactEntity {
    id: string;
    name: string;
    typeContact: number;

    constructor(id: string, name: string, typeContact: number) {
        this.id = id;
        this.name = name;
        this.typeContact = typeContact;
    }

    static fromPrimitive(data: {id: string, name: string, typeContact: number}) {
        return new ContactEntity(data.id, data.name, data.typeContact);
    }
}