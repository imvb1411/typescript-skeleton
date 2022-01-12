import { UserTokenWithName } from "./../../user-tokens/domain/user-token-entity";
import { ContactEntity } from "./contact-entity";

export interface IContactRepository {
    findByUser(userId: string, userType: number): Promise<Array<ContactEntity>>;
    findGroupForTutor(deviceFromId: string, destinationId: string): Promise<Array<UserTokenWithName>>
    findGroupForStudent(deviceFromId: string, destinationId: string): Promise<Array<UserTokenWithName>>
    findGroupForTeacher(deviceFromId: string, destinationId: string, destinationType: number): Promise<Array<UserTokenWithName>>
    findGroupForDirector(deviceFromId: string, destinationId: string): Promise<Array<UserTokenWithName>>
}