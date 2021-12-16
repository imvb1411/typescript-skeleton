import { Request, Response } from "express";
import { ContactFinder } from "./../../../modules/contacts/application/contact-finder";
import { BaseEndpoint } from "./../base.endpoint";
import { MySqlRepository } from "./../../../shared/infrastructure/persistence/MySqlRepository";
import { MySqlContactRepository } from "./../../../modules/contacts/infrastructure/mysql-contact-repository";
import httpStatus from "http-status";
import { GetContactsCommand } from "./contact.dto";

export default class GetContacts implements BaseEndpoint {

    async run(_req: Request, res: Response): Promise<void> {
        try {
            let userId = _req.body.user as GetContactsCommand;
            let contactFinder = new ContactFinder(new MySqlContactRepository(new MySqlRepository()));
            let contactsFound = await contactFinder.findByUserId(userId);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json(contactsFound);
        }catch(e) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(e.message);
        }
    }
}