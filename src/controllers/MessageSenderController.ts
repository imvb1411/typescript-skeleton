import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { MessageEntity } from "./../modules/Message/domain/message-entity";
import { Controller } from "./Controller";
import { MySqlRepository } from './../shared/infrastructure/persistence/MySqlRepository';
import MessageSender from './../modules/Message/application/message-sender';
import FirebaseMessaging from './../modules/Message/infrastructure/messaging/firebase/firebase-messaging';
import MySqlMessageRepository from './../modules/Message/infrastructure/persistence/mysql/MySqlMessageRepository';
import { ITokenRepository } from './../modules/token/domain/token-repository';
import { MySqlTokenRepository } from './../modules/token/infrastructure/persistence/MySqlTokenRepository';
import { TokenEntity } from './../modules/token/domain/token-entity';

export default class MessageSenderController implements Controller {
    
    constructor() { 
        
    }

    async run(_req: Request, res: Response): Promise<void>  {
        try {
            let tokenRepository = new MySqlTokenRepository(new MySqlRepository());
            var message: MessageEntity = MessageEntity.fromPrimitive(JSON.parse(_req.body.message.replace("'","")));
            message.createdAt = new Date(); // En la app se crea este campo   
            var tokenFounded: TokenEntity = await tokenRepository.findTokenByUserId(message.destinationId);
            if (tokenFounded == null) {
                throw new Error("El usuario no tiene una cuenta activa.");
            }
            var messageSender = new MessageSender(FirebaseMessaging.connect(), new MySqlMessageRepository(new MySqlRepository()));
            const messageSended = await messageSender.sendMessageToDevice(message, tokenFounded.firebaseToken);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json({ id: messageSended.id});
        }catch(error) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(error.message);
        }
    }

}