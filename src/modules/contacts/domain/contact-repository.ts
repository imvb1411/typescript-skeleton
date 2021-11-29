import { ContactEntity } from "./contact-entity";

export interface IContactRepository {
    findByUserId(userId: number): Promise<Array<ContactEntity>>;
}