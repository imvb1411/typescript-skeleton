import { ContactListResult, GetContactsCommand } from "./../../../api/endpoints/contacts/contact.dto";
import { IContactRepository } from "./../domain/contact-repository";

export class ContactFinder {

    constructor(private contactRepository: IContactRepository) { }

    async findByUserId(user: GetContactsCommand): Promise<ContactListResult> {
        let contactsFound = await this.contactRepository.findByUser(user.userId, user.userType);
        let contactListResult: ContactListResult = { contacts : contactsFound };
        return contactListResult;
    }
}