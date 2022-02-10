import { BaseEndpoint } from "../base.endpoint";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { DeleteUserRestrictionCommand, DeleteUserRestrictionResult } from "./user-restriction.dto";
import { UserRestrictionEliminator } from "../../../modules/user-restrictions/application/UserRestrictionEliminator";

export class DeleteUserRestriction implements BaseEndpoint {

    constructor(private userRestrinctionEliminator: UserRestrictionEliminator) {}

    async run(_req: Request, res: Response): Promise<void> {
        try {
            let createRestrictionCommand: DeleteUserRestrictionCommand = _req.body.restriction as DeleteUserRestrictionCommand;
            let result: DeleteUserRestrictionResult = await this.userRestrinctionEliminator.delete(createRestrictionCommand);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json({ "UserRestriction" : result });
        }catch(e) {
            let message = e.message;
            res.status(httpStatus.SERVICE_UNAVAILABLE).json({ "error": { message } });
        }
    }
}