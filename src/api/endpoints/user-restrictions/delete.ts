import { BaseEndpoint } from "../base.endpoint";
import { Request, Response } from "express";
import container from "./../../../dependency-injection";
import httpStatus from "http-status";
import { MySqlRepository } from "../../../shared/infrastructure/persistence/mysql/MySqlRepository";
import { DeleteUserRestrictionCommand, DeleteUserRestrictionResult } from "./user-restriction.dto";
import { UserRestrictionEliminator } from "./../../../modules/user-restrictions/application/user-restriction-eliminator";
import { MySqlUserRestrictionRepository } from "../../../modules/user-restrictions/infrastructure/persistence/mysql/MySqlUserRestrictionRepository";

export default class DeleteUserRestriction implements BaseEndpoint {

    async run(_req: Request, res: Response): Promise<void> {
        try {
            let createRestrictionCommand: DeleteUserRestrictionCommand = _req.body.restriction as DeleteUserRestrictionCommand;
            const userRestrictionEliminator = new UserRestrictionEliminator(new MySqlUserRestrictionRepository(new MySqlRepository(null)), container.get('shared.logger'));
            
            let result: DeleteUserRestrictionResult = await userRestrictionEliminator.delete(createRestrictionCommand);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json({ "UserRestriction" : result });
        }catch(e) {
            let message = e.message;
            res.status(httpStatus.SERVICE_UNAVAILABLE).json({ "error": { message } });
        }
    }
}