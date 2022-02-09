import { Request, Response } from "express";
import { ContactFinder } from "../../../modules/contacts/application/ContactFinder";
import { BaseEndpoint } from "../base.endpoint";
import httpStatus from "http-status";
import { GetContactsCommand } from "./contact.dto";

export class GetContacts implements BaseEndpoint {
    
    constructor(private contactFinder: ContactFinder) { }

    async run(_req: Request, res: Response) {
        try {
            let userId = _req.body.user as GetContactsCommand;
            let contactsFound = await this.contactFinder.findByUserId(userId);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json(contactsFound);
        }catch(e) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(e.message);
        }
    }
}