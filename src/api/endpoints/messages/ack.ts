import { Request, Response } from 'express';
import { BaseEndpoint } from "./../base.endpoint";
import httpStatus from 'http-status';
import MessageConfirmer from './../../../modules/messages/application/receive-message-confirmer';
import MySqlMessageRepository from './../../../modules/messages/infrastructure/persistence/mysql/MySqlMessageRepository';
import { MySqlRepository } from './../../../shared/infrastructure/persistence/MySqlRepository';
import { ConfirmMessageCommand } from './message.dto';

export default class MessageACK implements BaseEndpoint {
    
    async run(_req: Request, res: Response): Promise<void>  {
        try { 
            const message: ConfirmMessageCommand = _req.body.message as ConfirmMessageCommand;
            const messageConfirmer: MessageConfirmer = new MessageConfirmer(new MySqlMessageRepository(new MySqlRepository()));
            await messageConfirmer.confirmReceivedMessage(null);//TODO
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json(message);
        }catch(error) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(error);
        }        
    } 
}