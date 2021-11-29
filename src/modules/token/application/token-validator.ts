import container from './../../../dependency-injection';
import Logger from "./../../../shared/domain/logger";
import { Uuid } from "./../../../shared/domain/value-object/Uuid";
import { TokenEntity } from "./../domain/token-entity";
import { TokenForCreation } from "./../domain/token-for-creation";
import { TokenForUpdate } from "./../domain/token-for-update";
import { ITokenRepository } from "./../domain/token-repository";
import { TokenProfile } from "./token-profile";
import { TokenForValidate } from "../domain/token-for-validate";

export class TokenValidator {
    private logger : Logger;
    private mapper: TokenProfile;

     constructor(private tokenRepository: ITokenRepository) {
        this.logger = container.get('shared.logger');
        this.mapper = new TokenProfile();
     }

    async validate(tokenReceived: TokenForValidate): Promise<boolean> {
        let currentDate: Date = new Date();
        
        let tokenFound = await this.tokenRepository.findTokenByUserId(tokenReceived.userId);
        console.log(tokenFound);

        if (tokenFound != null && tokenReceived.firebaseToken == tokenFound.firebaseToken) { 
            return true;
        } else if (tokenFound != null && tokenReceived.firebaseToken != tokenFound.firebaseToken) {        
            const tokenForUpdate: TokenForUpdate = this.mapper.map<TokenEntity, TokenForUpdate>(tokenFound, new TokenForUpdate());  
            console.log("Modificando");
            tokenForUpdate.status = 0;
            tokenForUpdate.updatedAt = currentDate;
            console.log(tokenForUpdate);
            await this.tokenRepository.update(tokenForUpdate);
        }
        console.log("Creando");
        const tokenForCreation = this.mapper.map<TokenForValidate, TokenForCreation>(tokenReceived, new TokenForCreation());
        console.log(tokenForCreation);
        tokenForCreation.id = Uuid.random().value;
        tokenForCreation.status = 1;
        tokenForCreation.createdAt = currentDate;
        await this.tokenRepository.save(tokenForCreation);

        return true;     
    }
}