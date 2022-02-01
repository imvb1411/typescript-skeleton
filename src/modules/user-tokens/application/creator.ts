import { Uuid } from "../../../shared/domain/value-object/Uuid";
import { UserTokenEntity } from "../domain/user-token-entity";
import { ITokenRepository } from "../domain/user-token-repository";
import { TokenProfile } from "../../../api/mappers/token-profile";
import Logger from "../../../shared/domain/logger";
import { CreateTokenCommand, CreateTokenResult } from "./../../../api/endpoints/user-token/token.dto";

export class TokenCreator {

    private mapper: TokenProfile;

    constructor(private repository: ITokenRepository, private logger: Logger) { 
        this.mapper = new TokenProfile();
    }
    
    async create(tokenForCreate: CreateTokenCommand): Promise<CreateTokenResult> {
        let currentDate: Date = new Date();
        this.logger.info("TokenForCreate: Receive " + tokenForCreate);
        let tokenFound: UserTokenEntity = await this.repository.findUserTokenByUserIdAndType(tokenForCreate.userId, tokenForCreate.userType);
        let createTokenResult: CreateTokenResult = { id: null, userId: null, userType: null, firebaseToken: null };

        if (tokenFound != null) {
            if (tokenFound.firebaseToken == tokenForCreate.firebaseToken && tokenFound.userId != tokenForCreate.userId) {
                throw new Error("El token esta activado para otro usuario.");
            }else if(tokenFound.firebaseToken == tokenForCreate.firebaseToken && tokenFound.userId == tokenForCreate.userId) {
                createTokenResult = this.mapper.map<UserTokenEntity, CreateTokenResult>(tokenFound, createTokenResult);
                createTokenResult.id = tokenFound.id;
                createTokenResult.userType = tokenFound.userType;
                return createTokenResult;
            }else if (tokenForCreate.firebaseToken != tokenFound.firebaseToken && tokenFound.userId == tokenForCreate.userId) {
                tokenFound.state = 0;
                tokenFound.updatedAt = currentDate;
                await this.repository.update(tokenFound);
                this.logger.info("TokenCreator: Update " + tokenFound.id);
            }
        }

        let tokenForCreation: UserTokenEntity = this.mapper.map<CreateTokenCommand, UserTokenEntity>(tokenForCreate, new UserTokenEntity());
        tokenForCreation.id = Uuid.random().value;
        tokenForCreation.userType = tokenForCreate.userType;
        tokenForCreation.state = 1;
        tokenForCreation.createdAt = currentDate;
        await this.repository.save(tokenForCreation);
        this.logger.info("TokenCreator: Save " + JSON.stringify(tokenForCreation));

        createTokenResult = this.mapper.map<UserTokenEntity, CreateTokenResult>(tokenForCreation, createTokenResult);
        createTokenResult.id = tokenForCreation.id;
        createTokenResult.userType = tokenForCreation.userType;

        return createTokenResult;
    }
}