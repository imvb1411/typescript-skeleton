import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { MessageEntity } from "./../modules/Message/domain/message-entity";
import { Controller } from "./Controller";
import { MySqlRepository } from './../shared/infrastructure/persistence/MySqlRepository';
import MessageSender from './../modules/Message/application/message-sender';
import FirebaseMessaging from './../modules/Message/infrastructure/messaging/firebase/firebase-messaging';
import MySqlMessageRepository from './../modules/Message/infrastructure/persistence/mysql/MySqlMessageRepository';

export default class MessageSenderController implements Controller {
    
    constructor() { }

    async run(_req: Request, res: Response): Promise<void>  {
        try {
            var message: MessageEntity = MessageEntity.fromPrimitive(_req.body.message);
            var token = _req.body.token;
            message.createdAt = new Date(); // En la app se crea este campo   
            //var token: string = await token.findByUserId(message.destinationId); 
            var messageSender = new MessageSender(FirebaseMessaging.connect(), new MySqlMessageRepository(new MySqlRepository()));
            const messageSended = await messageSender.sendMessageToDevice(message, token);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json(messageSended);
        }catch(error) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(error.message);

        }
    }

}