import { CreateUserRestrictionResult } from "../user-restrictions/user-restriction.dto";
import { CreateTokenWithNameResult } from "../user-token/token.dto";
import { ContactType, CourseEntity } from "./../../../modules/contacts/domain/contact-entity";

export interface GetContactsCommand {
    userId: string;
    userType: number;
}
export interface ContactResult {
    id: string;
    name: string;
    contactType: ContactType;
    courses: Array<CourseEntity>
}

export interface ContactListResult {
    contacts: Array<ContactResult>;
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