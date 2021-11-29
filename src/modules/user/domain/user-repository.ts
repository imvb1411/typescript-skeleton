import { UserEntity } from "./user-entity";
import { UserForUpdate } from "./user-for-update";

export interface IUserRepository {
    save(user: UserEntity): Promise<number>;
    update(userForUpdate: UserForUpdate): Promise<number>;
    findById(id: string): Promise<UserEntity>;
}