import { BaseEndpoint } from "./../base.endpoint";
import { Request, Response } from "express";
import container from "./../../../dependency-injection";
import httpStatus from "http-status";
import { MySqlRepository } from "../../../shared/infrastructure/persistence/mysql/MySqlRepository";
import { CreateUserRestrictionCommand, CreateUserRestrictionResult } from "./user-restriction.dto";
import { UserRestrictionCreator } from "./../../../modules/user-restrictions/application/user-restriction-creator";
import { MySqlUserRestrictionRepository } from "../../../modules/user-restrictions/infrastructure/persistence/mysql/MySqlUserRestrictionRepository";

export default class CreateUserRestriction implements BaseEndpoint {

    async run(_req: Request, res: Response): Promise<void> {
        try {
            let createRestrictionCommand: CreateUserRestrictionCommand = _req.body.restriction as CreateUserRestrictionCommand;
            const restrictionCreator = new UserRestrictionCreator(new MySqlUserRestrictionRepository(new MySqlRepository(null)), container.get('shared.logger'));
            
            let result: CreateUserRestrictionResult = await restrictionCreator.create(createRestrictionCommand);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json({ "UserRestriction" : result });
        }catch(e) {
            let message = e.message;
            res.status(httpStatus.SERVICE_UNAVAILABLE).json({ "error": { message } });
        }
    }
}