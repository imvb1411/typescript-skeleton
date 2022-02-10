import { Request, Response } from "express";
import { ContactFinder } from "../../../modules/contacts/application/ContactFinder";
import { BaseEndpoint } from "../base.endpoint";
import httpStatus from "http-status";
import { GetGroupMembersCommand, GroupMembersListResult } from "./contact.dto";

export class GetGroupMembers implements BaseEndpoint {

    constructor(private contactFinder: ContactFinder) { }

    async run(_req: Request, res: Response): Promise<void> {
        try {
            let member = _req.body.group as GetGroupMembersCommand;
            let groupMembers: GroupMembersListResult = await this.contactFinder.findGroupMembers(member);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json(groupMembers);
        }catch(e) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(e.message);
        }
    }
}