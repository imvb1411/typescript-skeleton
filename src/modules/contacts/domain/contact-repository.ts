import { UserTokenEntity } from "./../../token/domain/token-entity";
import { ContactEntity } from "./contact-entity";

export interface IContactRepository {
    findByUser(userId: string, userType: number): Promise<Array<ContactEntity>>;
}