import { ContactEntity } from "./contact-entity";

export class ContactListDto {
    contacts: Array<ContactEntity>;

    /**
     *
     */
    constructor(contacts: Array<ContactEntity>) {
        this.contacts = contacts;
    }
}