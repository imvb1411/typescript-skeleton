import { Controller } from "controllers/Controller";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserEntity } from "./../modules/user/domain/user-entity";
import { TokenValidator } from "./../modules/token/application/token-validator";
import { TokenForValidate } from "./../modules/token/domain/token-for-validate";
import { MySqlTokenRepository } from "./../modules/token/infrastructure/persistence/MySqlTokenRepository";
import { MySqlUserRepository } from "./../modules/user/infrastructure/mysql-user-repository";
import { MySqlRepository } from "./../shared/infrastructure/persistence/MySqlRepository";
import { UserForUpdate } from "./../modules/user/domain/user-for-update";
import { UserProfile } from "./../modules/user/application/user-profile";

export default class TokenValidatorController implements Controller {

    constructor() { }
    
    async run(_req: Request, res: Response): Promise<void> {
        try { 
            let tokenReceived: TokenForValidate = new TokenForValidate(_req.body.identification, _req.body.token);
            
            const tokenValidator = new TokenValidator(new MySqlTokenRepository(new MySqlRepository()));
            const userRepository = new MySqlUserRepository(new MySqlRepository());
            let userForUpdate = new UserForUpdate();
            userForUpdate.id = tokenReceived.userId;
            userForUpdate.name = _req.body.name;
            let userFound: UserEntity = await userRepository.findById(tokenReceived.userId);
            if (userFound == null) {
                var user = new UserEntity(tokenReceived.userId, userForUpdate.name);
                console.log(user);
                await userRepository.save(user);
            }else if (userFound.name != userForUpdate.name) {
                console.log(userForUpdate);
                await userRepository.update(userForUpdate);
            }
            let result = await tokenValidator.validate(tokenReceived);
            res.status(httpStatus.OK).json(tokenReceived);
        }catch(error) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(error);
        }    
    }

}