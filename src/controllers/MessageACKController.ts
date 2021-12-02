import { Request, Response } from 'express';
import { Controller } from "./Controller";
import httpStatus from 'http-status';
import { MessageEntity } from './../modules/Message/domain/message-entity';
import MessageConfirmer from './../modules/Message/application/message-confirmer';
import MySqlMessageRepository from './../modules/Message/infrastructure/persistence/mysql/MySqlMessageRepository';
import { MySqlRepository } from './../shared/infrastructure/persistence/MySqlRepository';

export default class MessageACKController implements Controller {
    
    constructor() { }

    async run(_req: Request, res: Response): Promise<void>  {
        try { 
            const message: MessageEntity = MessageEntity.fromPrimitive(JSON.parse(_req.body.message.replace("'","")));
            const messageConfirmer: MessageConfirmer = new MessageConfirmer(new MySqlMessageRepository(new MySqlRepository()));
            await messageConfirmer.confirmReceivedMessage(message);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json(message);
        }catch(error) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(error);
        }        
    } 
}