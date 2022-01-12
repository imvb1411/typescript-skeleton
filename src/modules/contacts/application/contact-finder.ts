import { ContactListResult, GetContactsCommand, GetGroupMembersCommand, GroupMembersListResult } from "./../../../api/endpoints/contacts/contact.dto";
import { IContactRepository } from "./../domain/contact-repository";
import Logger from "./../../../shared/domain/logger";
import { UserTokenWithName } from "./../../user-tokens/domain/user-token-entity";
import { ContactType } from "../domain/contact-entity";

export class ContactFinder {

    constructor(private contactRepository: IContactRepository, private logger: Logger) { }

    async findByUserId(user: GetContactsCommand): Promise<ContactListResult> {
        this.logger.info('GetContacts: ' + JSON.stringify(user));
        let contactsFound = await this.contactRepository.findByUser(user.userId, user.userType);
        let contactListResult: ContactListResult = { contacts : contactsFound };
        return contactListResult;
    }

    async findGroupMembers(command: GetGroupMembersCommand): Promise<GroupMembersListResult> {
        this.logger.info('GetGroupMembers: ' + JSON.stringify(command));
        var tokens: UserTokenWithName[] = [];
            switch(command.deviceFromType) {
                case ContactType.Tutor:
                    tokens = await this.contactRepository.findGroupForTutor(command.deviceFromId, command.destinationId);
                    break;
                case ContactType.Student:
                    tokens = await this.contactRepository.findGroupForStudent(command.deviceFromId, command.destinationId);
                    break;
                case ContactType.Teacher:
                    tokens = await this.contactRepository.findGroupForTeacher(command.deviceFromId, command.destinationId, command.destinationType);
                    break; 
                case ContactType.Director:
                    tokens = await this.contactRepository.findGroupForDirector(command.deviceFromId, command.destinationId);
                    break; 
                case ContactType.Staff:
                    break; 
            }
        let groupMembers: GroupMembersListResult = { contacts: tokens };
        return groupMembers;
    }
}