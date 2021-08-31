import { Request, Response } from 'express';
import { Uuid } from './../shared/domain/value-object/Uuid';
import httpStatus from 'http-status';
import FirebaseMessageSender from '../modules/Message/application/firebase-message-sender';
import FirebaseMessaging from '../services/_impl/firebase-messaging';
import { MessageEntity } from "../modules/Message/domain/message-entity";
import IMessaging from "./../services/IMessaging";
import { Controller } from "./Controller";
import { ServiceAccount } from '../config/service-account';
import MessageRepository from './../modules/Message/domain/message-repository';
import { MySqlRepository } from './../shared/infrastructure/persistence/MySqlRepository';

export default class MessageSenderController implements Controller {

    serviceAccount: ServiceAccount;
    
    constructor(private messaging: IMessaging) { }

    async run(_req: Request, res: Response) {
        var message: MessageEntity = MessageEntity.fromPrimitive(_req.body.message);
        var token = _req.body.token;
        message.id = Uuid.random().value;
        message.createdAt = new Date();
        message.sendedAt = new Date();
        //var token: string = await token.findByUserId(message.destinationId); 
        this.messaging = new FirebaseMessaging(FirebaseMessageSender.getInstance(), new MessageRepository(new MySqlRepository()));
        const queryResponse: MessageEntity = await this.messaging.sendMessage(message, token);

        res.header('Access-Control-Allow-Origin', '*');
        return res.status(httpStatus.OK).json(queryResponse);
    }

}