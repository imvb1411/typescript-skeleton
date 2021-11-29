import { Request, Response } from "express";
import { ContactFinder } from "./../modules/contacts/application/contact-finder";
import { Controller } from "./Controller";
import { MySqlRepository } from "./../shared/infrastructure/persistence/MySqlRepository";
import { MySqlContactRepository } from "./../modules/contacts/infrastructure/mysql-contact-repository";
import httpStatus from "http-status";

export default class GetContactsController implements Controller {

    async run(_req: Request, res: Response): Promise<void> {
        try {
            let userId = _req.body.userId;
            let contactFinder = new ContactFinder(new MySqlContactRepository(new MySqlRepository()));
            let contactsFound = await contactFinder.findByUserId(userId);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json(contactsFound);
        }catch(e) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(e.message);
        }
    }
}