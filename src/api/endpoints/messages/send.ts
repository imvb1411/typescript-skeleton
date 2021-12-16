import { Request, Response } from 'express';
import { BaseEndpoint } from "./../base.endpoint";
import { MySqlRepository } from './../../../shared/infrastructure/persistence/MySqlRepository';
import MessageSender from './../../../modules/messages/application/sender';
import FirebaseMessaging from './../../../modules/messages/infrastructure/messaging/firebase/firebase-messaging';
import MySqlMessageRepository from './../../../modules/messages/infrastructure/persistence/mysql/MySqlMessageRepository';
import { MySqlTokenRepository } from './../../../modules/token/infrastructure/persistence/MySqlTokenRepository';
import { UserTokenEntity } from './../../../modules/token/domain/token-entity';
import httpStatus from 'http-status';
import { SendMessageCommand, SendMessageResult } from './message.dto';
import container from './../../../dependency-injection';
import moment from 'moment';

export default class SendMessage implements BaseEndpoint {

    async run(_req: Request, res: Response): Promise<void>  {
        try {
            let tokenRepository = new MySqlTokenRepository(new MySqlRepository());
            var messageToSend: SendMessageCommand = _req.body.message as SendMessageCommand;
            // m.isValid(); // false
            //var message: MessageEntity = MessageEntity.fromPrimitive(JSON.parse(_req.body.message.replace("'","")));
            //var message: MessageEntity = MessageEntity.fromPrimitive(_req.body.message);
            var messageSender = new MessageSender(FirebaseMessaging.connect(), new MySqlMessageRepository(new MySqlRepository()), container.get('shared.logger'));
            //message.createdAt = new Date(); // En la app se crea este campo   
            let messageSended: SendMessageResult;
            if (messageToSend.forGroup == 0) {
                var tokenFounded: UserTokenEntity = await tokenRepository.findUserTokenByUserIdAndType(messageToSend.destinationId, messageToSend.destinationType);
                if (tokenFounded == null) {
                    throw new Error("El usuario no tiene una cuenta activa.");
                }
                messageSended = await messageSender.sendMessageToDevice(messageToSend, tokenFounded.firebaseToken);
            }else {
                let x = await messageSender.sendMessageToGroup(messageToSend);
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json({ "message": messageSended });
        }catch(error) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(error.message);
        }
    }

}