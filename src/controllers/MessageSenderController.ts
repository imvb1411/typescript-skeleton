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
            // var message: MessageEntity = MessageEntity.fromPrimitive(_req.body.message);
            var messageSender = new MessageSender(FirebaseMessaging.connect(), new MySqlMessageRepository(new MySqlRepository()));
            message.createdAt = new Date(); // En la app se crea este campo   
            let messageSended;
            if (message.forGroup == 0) {
                var tokenFounded: TokenEntity = await tokenRepository.findTokenByUserId(message.destinationId, 1);
                if (tokenFounded == null) {
                    throw new Error("El usuario no tiene una cuenta activa.");
                }
                messageSended = await messageSender.sendMessageToDevice(message, tokenFounded.firebaseToken);
            }else {
                messageSended = await messageSender.sendMessageToGroup(message);
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json({ id: messageSended.id});
        }catch(error) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(error.message);
        }
    }

}