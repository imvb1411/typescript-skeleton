import { ContactListResult, GetContactsCommand, GetGroupMembersCommand, GroupMemberRestrictionResult, GroupMembersListResult } from "../../../api/endpoints/contacts/contact.dto";
import { IContactRepository } from "../domain/contact-repository";
import Logger from "../../../shared/domain/logger";
import { UserTokenWithName } from "../../user-tokens/domain/user-token-entity";
import { ContactType } from "../domain/contact-entity";
import { IUserRestrictionRepository } from "../../user-restrictions/domain/user-restriction-repository";
import { UserRestrictionEntity } from "./../../user-restrictions/domain/user-restriction-entity";
import { CreateUserRestrictionResult } from "./../../../api/endpoints/user-restrictions/user-restriction.dto";
import moment from "moment";
import { CreateTokenWithNameResult } from "./../../../api/endpoints/user-token/token.dto";

export class ContactFinder {

    constructor(private contactRepository: IContactRepository, private restrictionRepository: IUserRestrictionRepository, private logger: Logger) { }

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
        
        let groupMemberRestrictionsResult: GroupMemberRestrictionResult[] = new Array<GroupMemberRestrictionResult>();
        for(let token of tokens) {
            let restrictions: UserRestrictionEntity[] = await this.restrictionRepository.findRestrictions(token.userId, command.deviceFromId, command.destinationType);
            let userRestrictionsResult: CreateUserRestrictionResult[] = new Array<CreateUserRestrictionResult>();
            for (let restriction of restrictions) {
                let userRestriction: CreateUserRestrictionResult = { id: restriction.id, restrictionType: restriction.restrictionType, createdAt: moment(restriction.createdAt).format("yyyy-MM-DD HH:mm:ss")};
                userRestrictionsResult.push(userRestriction);
            }
            let tokenResult: CreateTokenWithNameResult = { id: token.id, userId: token.userId, userType: token.userType, name: token.name, firebaseToken: token.firebaseToken};
            let groupMemberRestriction: GroupMemberRestrictionResult = { userToken: tokenResult, userRestrictions: userRestrictionsResult };
            groupMemberRestrictionsResult.push(groupMemberRestriction);
        }
        let groupMembers: GroupMembersListResult = { contacts: groupMemberRestrictionsResult };
        return groupMembers;
    }
}