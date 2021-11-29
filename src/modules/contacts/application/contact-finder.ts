import { ContactListDto } from "../domain/contact-dto";
import { ContactEntity } from "./../domain/contact-entity";
import { IContactRepository } from "./../domain/contact-repository";

export class ContactFinder {

    /**
     *
     */
    constructor(private contactRepository: IContactRepository) { }

    async findByUserId(userId: number): Promise<ContactListDto> {
        let contacts = await this.contactRepository.findByUserId(userId);
        return new ContactListDto(contacts);
    }
}