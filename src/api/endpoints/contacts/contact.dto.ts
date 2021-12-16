import { ContactEntity } from "./../../../modules/contacts/domain/contact-entity";

export interface GetContactsCommand {
    userId: string;
    userType: number;
}

export interface ContactListResult {
    contacts: Array<ContactEntity>;
}