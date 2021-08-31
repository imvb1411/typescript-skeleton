import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { MessageEntity } from './../modules/Message/domain/message-entity';
import IMessaging from './../services/IMessaging';
import { Controller } from "./Controller";
import Synchronizer from './../services/_impl/synchronizer';
import MessageSynchronizer from './../modules/Message/application/message-synchronizer';
import MessageRepository from './../modules/Message/domain/message-repository';
import { MySqlRepository } from './../shared/infrastructure/persistence/MySqlRepository';

export default class MessageSynchronizerController implements Controller {

    constructor(private messaging: IMessaging) {}

    async run(_req: Request, res: Response): Promise<Response> {
        console.log(_req.body);
        var messages: Array<MessageEntity> = _req.body.messages;
        //var token: string = await token.findByUserId(message.destinationId); 
        var token: "";    
        const messageRepository: MessageRepository = new MessageRepository(new MySqlRepository);
        const messageSynchronizer: MessageSynchronizer = new MessageSynchronizer(messageRepository);
        this.messaging = new Synchronizer(messageSynchronizer);
        var queryResponse = await this.messaging.synchronize(messages);

        res.header('Access-Control-Allow-Origin', '*');
        return res.status(httpStatus.OK).json(queryResponse);
    }
}