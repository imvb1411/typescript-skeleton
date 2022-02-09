import { Request, Response } from 'express';
import { BaseEndpoint } from "../base.endpoint";
import httpStatus from 'http-status';
import container from './../../../dependency-injection';
import MessageConfirmer from './../../../modules/messages/application/receive-message-confirmer';
import MySqlMessageRepository from './../../../modules/messages/infrastructure/persistence/mysql/MySqlMessageRepository';
import { MySqlRepository } from '../../../shared/infrastructure/persistence/mysql/MySqlRepository';
import { ConfirmMessageCommand } from './message.dto';
import Logger from './../../../shared/domain/logger';

export default class MessageACK implements BaseEndpoint {
    
    async run(_req: Request, res: Response): Promise<void>  {
        try { 
            const message: ConfirmMessageCommand = _req.body.message as ConfirmMessageCommand;
            const messageConfirmer: MessageConfirmer = new MessageConfirmer(new MySqlMessageRepository(new MySqlRepository()), container.get('shared.logger'));
            await messageConfirmer.confirmReceivedMessage(message);//TODO
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json(message);
        }catch(error) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(error);
        }        
    } 
}