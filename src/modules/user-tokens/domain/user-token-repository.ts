import { UserTokenEntity } from "./user-token-entity";

export interface ITokenRepository {
    save(token : UserTokenEntity): Promise<number>;
    update(token : UserTokenEntity): Promise<number>;
    findUserTokenByToken(token: string): Promise<UserTokenEntity>;
    findUserTokenByUserIdAndType(userId: string, userTypeId: number): Promise<UserTokenEntity>;
    findTokensByGroupId(groupId: string): Promise<UserTokenEntity[]>;
}