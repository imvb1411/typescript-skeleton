import { CreateUserRestrictionResult } from "../user-restrictions/user-restriction.dto";
import { CreateTokenWithNameResult } from "../user-token/token.dto";
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

export interface GroupMemberRestrictionResult {
    userToken: CreateTokenWithNameResult;
    userRestrictions: CreateUserRestrictionResult[];
}

export interface GroupMembersListResult {
    contacts: Array<GroupMemberRestrictionResult>;
}