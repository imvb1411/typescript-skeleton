import { ContactEntity } from "./contact-entity";

export interface IContactRepository {
    findByUser(userId: string, userType: number): Promise<Array<ContactEntity>>;
}