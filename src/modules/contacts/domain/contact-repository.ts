import { UserTokenWithName } from "./../../user-tokens/domain/user-token-entity";
import { ContactEntity, CourseEntity } from "./contact-entity";

export interface IContactRepository {
    findByUser(userId: string, userType: number): Promise<Array<ContactEntity>>;
    findGroupForTutor(deviceFromId: string, destinationId: string): Promise<Array<UserTokenWithName>>
    findGroupForStudent(deviceFromId: string, destinationId: string): Promise<Array<UserTokenWithName>>
    findGroupForTeacher(deviceFromId: string, destinationId: string, destinationType: number): Promise<Array<UserTokenWithName>>
    findGroupForDirector(deviceFromId: string, destinationId: string): Promise<Array<UserTokenWithName>>
    getCourseForTutor(userId: string): Promise<Array<CourseEntity>>
    getCourseForStudent(userId: string): Promise<Array<CourseEntity>>
    getCourseForTeacher(userId: string): Promise<Array<CourseEntity>>
    getCourseForTutorByCourseId(userId: string, courseId: string): Promise<Array<CourseEntity>>
    getCourseForStudentByCourseId(userId: string, courseId: string): Promise<Array<CourseEntity>>
    getCourseForTeacherByCourseId(userId: string, courseId: string): Promise<Array<CourseEntity>>
}