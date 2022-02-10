import { Request, Response } from 'express';
import { BaseEndpoint } from "../base.endpoint";
import httpStatus from 'http-status';
import { MessageConfirmer } from '../../../modules/messages/application/MessageConfirmer';
import { ConfirmMessageCommand } from './message.dto';

export class ConfirmMessage implements BaseEndpoint {
    
    constructor(private messageConfirmer: MessageConfirmer) {}

    async run(_req: Request, res: Response): Promise<void>  {
        try { 
            const message: ConfirmMessageCommand = _req.body.message as ConfirmMessageCommand;
            await this.messageConfirmer.confirmReceivedMessage(message);//TODO
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json(message);
        }catch(error) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(error);
        }        
    } 
}