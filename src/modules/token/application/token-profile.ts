import { TypeMapper } from "ts-mapper";
import { TokenEntity } from "../domain/token-entity";
import { TokenForCreation } from "../domain/token-for-creation";
import { TokenForUpdate } from "../domain/token-for-update";
import { TokenForValidate } from "../domain/token-for-validate";

export class TokenProfile extends TypeMapper {
    constructor() {
        super();
        this.config();
    }

    private config(): void {
        this.createMap<TokenEntity, TokenForCreation>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.userId, dest => dest.userId)
            .map(src => src.firebaseToken, dest => dest.firebaseToken)
            .map(src => src.status, dest => dest.status)
            .map(src => src.createdAt, dest => dest.createdAt);

        this.createMap<TokenEntity, TokenForUpdate>()
            .map(src => src.id, dest => dest.id);
            
        this.createMap<TokenForValidate, TokenForCreation>()
            .map(src => src.userId, dest => dest.userId)
            .map(src => src.firebaseToken, dest => dest.firebaseToken);
    }
}