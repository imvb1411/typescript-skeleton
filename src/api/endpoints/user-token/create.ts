import { BaseEndpoint } from "../base.endpoint";
import container from "./../../../dependency-injection";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { TokenCreator } from "../../../modules/user-tokens/application/creator";
import { MySqlTokenRepository } from "../../../modules/user-tokens/infrastructure/persistence/mysql/MySqlUserTokenRepository";
import { MySqlRepository } from "../../../shared/infrastructure/persistence/mysql/MySqlRepository";
import { CreateTokenCommand, CreateTokenResult } from "./token.dto";

export default class CreateToken implements BaseEndpoint {

    async run(_req: Request, res: Response): Promise<void> {
        try {
            console.log(_req.body)
            let createTokenCommand: CreateTokenCommand = _req.body.token as CreateTokenCommand;
            const tokenCreator = new TokenCreator(new MySqlTokenRepository(new MySqlRepository()), container.get('shared.logger'));
            
            let result: CreateTokenResult = await tokenCreator.create(createTokenCommand);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json({ "UserToken" : result });
        }catch(e) {
            let message = e.message;
            res.status(httpStatus.SERVICE_UNAVAILABLE).json({ "error": { message } });
        }
    }
}