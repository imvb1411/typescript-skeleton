import { Request, Response } from 'express';
import { Controller } from "./Controller";
import httpStatus from 'http-status';
import MessageConfirmer from './../modules/Message/application/message-confirmer';
import MySqlMessageRepository from './../modules/Message/infrastructure/persistence/mysql/MySqlMessageRepository';
import { MySqlRepository } from './../shared/infrastructure/persistence/MySqlRepository';
import { MessagesResponse } from './../modules/Message/application/messages-response';

export default class MessageACKController implements Controller {
    
    constructor() { }

    async run(_req: Request, res: Response): Promise<void>  {
        try { 
            console.log(_req.body)
            const id: string = _req.body.id;
            // const messages: MessagesResponse = new MessagesResponse(JSON.parse(_req.body.messages.replace("'","")));
            console.log("messageACK: ", id);
            const messageConfirmer: MessageConfirmer = new MessageConfirmer(new MySqlMessageRepository(new MySqlRepository()));
            const confirm: number = await messageConfirmer.confirmReceivedMessage(id);
            res.header('Access-Control-Allow-Origin', '*');
            console.log(confirm);
            res.status(httpStatus.OK).json(confirm);
        }catch(error) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(error);
        }        
    } 
}