import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from "./Controller";
import MessageSynchronizer from './../modules/Message/application/message-synchronizer';
import { MySqlRepository } from './../shared/infrastructure/persistence/MySqlRepository';
import { MessagesResponse } from './../modules/Message/application/messages-response';
import MySqlMessageRepository from './../modules/Message/infrastructure/persistence/mysql/MySqlMessageRepository';

export default class MessageSynchronizerController implements Controller {

    constructor() {}

    async run(_req: Request, res: Response): Promise<void> {   
        try {
            const destinationId: number = _req.body.destinationId;
            const synchronizer = new MessageSynchronizer(new MySqlMessageRepository(new MySqlRepository()));
            const pendingMessages: MessagesResponse = new MessagesResponse(await synchronizer.getPendingMessages(destinationId));
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json(pendingMessages);
        } catch (error) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(error);
        }
    }
}