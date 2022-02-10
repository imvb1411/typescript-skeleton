import { BaseEndpoint } from "../base.endpoint";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { TokenCreator } from "../../../modules/user-tokens/application/TokenCreator";
import { CreateTokenCommand, CreateTokenResult } from "./token.dto";

export class CreateUserToken implements BaseEndpoint {

    constructor(private tokenCreator: TokenCreator) { }

    async run(_req: Request, res: Response): Promise<void> {
        try {
            let createTokenCommand: CreateTokenCommand = _req.body.token as CreateTokenCommand;
            let result: CreateTokenResult = await this.tokenCreator.create(createTokenCommand);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json({ "UserToken" : result });
        }catch(e) {
            let message = e.message;
            res.status(httpStatus.SERVICE_UNAVAILABLE).json({ "error": { message } });
        }
    }
}