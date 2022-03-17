import { UserTokenWithName } from "./../../user-tokens/domain/user-token-entity";
import { ContactEntity, GroupEntity } from "./contact-entity";

export interface IContactRepository {
    findByUser(userId: string, userType: number): Promise<Array<ContactEntity>>;
    findGroupForTutor(deviceFromId: string, destinationId: string): Promise<Array<UserTokenWithName>>
    findGroupForStudent(deviceFromId: string, destinationId: string): Promise<Array<UserTokenWithName>>
    findGroupForTeacher(deviceFromId: string, destinationId: string, destinationType: number): Promise<Array<UserTokenWithName>>
    findGroupForDirector(deviceFromId: string, destinationId: string): Promise<Array<UserTokenWithName>>
    getAllCourses(): Promise<Array<GroupEntity>>;
    getCourseForTutor(userId: string): Promise<Array<GroupEntity>>
    getCourseForStudent(userId: string): Promise<Array<GroupEntity>>
    getCourseForTeacher(userId: string): Promise<Array<GroupEntity>>
    getCourseForTutorByCourseId(userId: string, courseId: string): Promise<Array<GroupEntity>>
    getCourseForStudentByCourseId(userId: string, courseId: string): Promise<Array<GroupEntity>>
    getCourseForTeacherByCourseId(userId: string, courseId: string): Promise<Array<GroupEntity>>
    getOccupation(userId: string): Promise<GroupEntity>
}