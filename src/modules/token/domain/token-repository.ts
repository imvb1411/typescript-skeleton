import { TokenEntity } from "./token-entity";
import { TokenForCreation } from "./token-for-creation";
import { TokenForUpdate } from "./token-for-update";

export interface ITokenRepository {
    save(token : TokenForCreation): Promise<number>;
    update(token : TokenForUpdate): Promise<number>;
    findTokenByUserId(userId: string): Promise<TokenEntity>;
}