import { UserTokenWithName } from "modules/user-tokens/domain/user-token-entity";
import { ContactEntity } from "./../../../modules/contacts/domain/contact-entity";

export interface GetContactsCommand {
    userId: string;
    userType: number;
}

export interface ContactListResult {
    contacts: Array<ContactEntity>;
}

export interface GetGroupMembersCommand {
    deviceFromId: string;
    deviceFromType: number;
    destinationId: string;
    destinationType: number;
}

export interface GroupMembersListResult {
    contacts: Array<UserTokenWithName>;
}