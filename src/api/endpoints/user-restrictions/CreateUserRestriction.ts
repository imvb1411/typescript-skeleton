import { BaseEndpoint } from "../base.endpoint";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { CreateUserRestrictionCommand, CreateUserRestrictionResult } from "./user-restriction.dto";
import { UserRestrictionCreator } from "../../../modules/user-restrictions/application/UserRestrictionCreator";

export class CreateUserRestriction implements BaseEndpoint {

    constructor(private userRestrictionCreator: UserRestrictionCreator) {}

    async run(_req: Request, res: Response): Promise<void> {
        try {
            let createRestrictionCommand: CreateUserRestrictionCommand = _req.body.restriction as CreateUserRestrictionCommand;
            let result: CreateUserRestrictionResult = await this.userRestrictionCreator.create(createRestrictionCommand);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json({ "UserRestriction" : result });
        }catch(e) {
            let message = e.message;
            res.status(httpStatus.SERVICE_UNAVAILABLE).json({ "error": { message } });
        }
    }
}