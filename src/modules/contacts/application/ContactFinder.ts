import { ContactListResult, ContactResult, GetContactsCommand, GetGroupMembersCommand, GroupMemberRestrictionResult, GroupMembersListResult } from "../../../api/endpoints/contacts/contact.dto";
import { IContactRepository } from "../domain/contact-repository";
import Logger from "../../../shared/domain/logger";
import { UserTokenWithName, UserType } from "../../user-tokens/domain/user-token-entity";
import { ContactEntity, ContactType, GroupEntity, GroupType } from "../domain/contact-entity";
import { IUserRestrictionRepository } from "../../user-restrictions/domain/user-restriction-repository";
import { UserRestrictionEntity } from "./../../user-restrictions/domain/user-restriction-entity";
import { CreateUserRestrictionResult } from "./../../../api/endpoints/user-restrictions/user-restriction.dto";
import moment from "moment";
import { CreateTokenWithNameResult } from "./../../../api/endpoints/user-token/token.dto";

export class ContactFinder {

    constructor(private contactRepository: IContactRepository, private restrictionRepository: IUserRestrictionRepository, private logger: Logger) { }

    async findByUserId(user: GetContactsCommand): Promise<ContactListResult> {
        this.logger.info('GetContacts: ' + JSON.stringify(user));
        let contactsResult: Array<ContactResult> = new Array<ContactResult>();
        let coursesUser: Array<GroupEntity> = new Array<GroupEntity>();

        switch (user.userType) {
            case UserType.Tutor:
                coursesUser = await this.contactRepository.getCourseForTutor(user.userId);
                break;
            case UserType.Student:
                coursesUser = await this.contactRepository.getCourseForStudent(user.userId);
                break;
            case UserType.Teacher:
                coursesUser = await this.contactRepository.getCourseForTeacher(user.userId);
                break;
            case UserType.Director:
                coursesUser = await this.contactRepository.getAllCourses(); 
                break;
            case UserType.Staff:
            case UserType.Director:
                coursesUser = await this.contactRepository.getAllCourses(); 
                break;
        }

        let contactsFound: Array<ContactEntity> = await this.contactRepository.findByUser(user.userId, user.userType);
        for (let contact of contactsFound) {
            let courses: Array<GroupEntity> = new Array<GroupEntity>();
            if (contact.contactType == ContactType.Director || contact.contactType == ContactType.Staff || contact.contactType == ContactType.TeacherAndDirectorGroup) {
                let groupEntity: GroupEntity 
                if (contact.contactType == ContactType.TeacherAndDirectorGroup) {
                    groupEntity = { id: contact.id, name: contact.name, type: GroupType.Course}
                } else {
                    groupEntity = await this.contactRepository.getOccupation(contact.id);
                }
                courses.push(groupEntity);
            } else {
                for (let courseUser of coursesUser) {
                    let coursesFounded: Array<GroupEntity> = new Array<GroupEntity>();
                    switch (contact.contactType) {
                        case ContactType.Tutor:
                            coursesFounded = await this.contactRepository.getCourseForTutorByCourseId(contact.id, courseUser.id);
                            break;
                        case ContactType.Student:
                            coursesFounded = await this.contactRepository.getCourseForStudentByCourseId(contact.id, courseUser.id);
                            break;
                        case ContactType.Teacher:
                            coursesFounded = await this.contactRepository.getCourseForTeacherByCourseId(contact.id, courseUser.id);
                            break;
                        case ContactType.Course:
                            if (contact.id == courseUser.id) {
                                let courseEntity: GroupEntity = { id: contact.id, name: contact.name, type: GroupType.Course } 
                                coursesFounded.push(courseEntity);
                            } 
                            break;
                        case ContactType.CourseWithTutors:
                            if (contact.id == courseUser.id) {
                                let courseEntity: GroupEntity = { id: contact.id, name: contact.name, type: GroupType.Course} 
                                coursesFounded.push(courseEntity);
                            }                       
                            break;
                    }
                    courses = courses.concat(coursesFounded);
                } 
            }
            
            let contactResult: ContactResult = { id: contact.id, name: contact.name, contactType: contact.contactType, courses: courses}
            contactsResult.push(contactResult);     
            console.log(contactsResult.length);              
        }
        let contactListResult: ContactListResult = { contacts : contactsResult };
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
                    tokens = await this.contactRepository.findGroupForDirector(command.deviceFromId, command.destinationId, command.destinationType);
                    break; 
                case ContactType.Staff:
                    break; 
            }
        
        let groupMemberRestrictionsResult: GroupMemberRestrictionResult[] = new Array<GroupMemberRestrictionResult>();
        for(let token of tokens) {
            let restrictions: UserRestrictionEntity[] = await this.restrictionRepository.findRestrictions(token.userId, command.destinationId, command.destinationType);
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