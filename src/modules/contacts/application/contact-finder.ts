import { ContactListResult, GetContactsCommand } from "./../../../api/endpoints/contacts/contact.dto";
import { IContactRepository } from "./../domain/contact-repository";
import Logger from "./../../../shared/domain/logger";

export class ContactFinder {

    constructor(private contactRepository: IContactRepository, private logger: Logger) { }

    async findByUserId(user: GetContactsCommand): Promise<ContactListResult> {
        this.logger.info('GetContacts: ' + JSON.stringify(user));
        let contactsFound = await this.contactRepository.findByUser(user.userId, user.userType);
        let contactListResult: ContactListResult = { contacts : contactsFound };
        return contactListResult;
    }
}