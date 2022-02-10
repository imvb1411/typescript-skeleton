import { Request, Response } from "express";
import container from "../../../dependency-injection";
import { ContactFinder } from "../../../modules/contacts/application/ContactFinder";
import { BaseEndpoint } from "../base.endpoint";
import { MySqlRepository } from "../../../shared/infrastructure/persistence/mysql/MySqlRepository";
import { MySqlContactRepository } from "../../../modules/contacts/infrastructure/persistence/mysql/MySqlContactRepository";
import httpStatus from "http-status";
import { GetGroupMembersCommand, GroupMembersListResult } from "./contact.dto";
import { MySqlUserRestrictionRepository } from "../../../modules/user-restrictions/infrastructure/persistence/mysql/MySqlUserRestrictionRepository";

export default class GetGroupMembers implements BaseEndpoint {

    async run(_req: Request, res: Response): Promise<void> {
        try {
            let member = _req.body.group as GetGroupMembersCommand;
            let contactFinder = new ContactFinder(new MySqlContactRepository(new MySqlRepository(null)), new MySqlUserRestrictionRepository(new MySqlRepository(null)), container.get('shared.logger'));
            let groupMembers: GroupMembersListResult = await contactFinder.findGroupMembers(member);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json(groupMembers);
        }catch(e) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(e.message);
        }
    }
}