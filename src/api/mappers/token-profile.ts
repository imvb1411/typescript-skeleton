import { TypeMapper } from "ts-mapper";
import { CreateTokenCommand, CreateTokenResult } from "./../endpoints/token/token.dto";
import { UserTokenEntity } from "../../modules/user-tokens/domain/user-token-entity";

export class TokenProfile extends TypeMapper {
    constructor() {
        super();
        this.config();
    }

    private config(): void {

        this.createMap<CreateTokenCommand, UserTokenEntity>()
            .map(src => src.userId, dest => dest.userId)
            .map(src => src.firebaseToken, dest => dest.firebaseToken);

        this.createMap<UserTokenEntity, CreateTokenCommand>()
            .map(src => src.userId, dest => dest.userId)
            .map(src => src.firebaseToken, dest => dest.firebaseToken);

        this.createMap<UserTokenEntity, CreateTokenResult>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.userId, dest => dest.userId)
            .map(src => src.firebaseToken, dest => dest.firebaseToken)
        
        this.createMap<CreateTokenResult, UserTokenEntity>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.userId, dest => dest.userId)
            .map(src => src.firebaseToken, dest => dest.firebaseToken)
            
    }
}