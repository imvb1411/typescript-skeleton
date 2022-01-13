import { Request, Response } from 'express';
import { BaseEndpoint } from "../base.endpoint";
import { MySqlRepository } from './../../../shared/infrastructure/persistence/MySqlRepository';
import MessageSender from './../../../modules/messages/application/sender';
import FirebaseMessaging from './../../../modules/messages/infrastructure/messaging/firebase/firebase-messaging';
import MySqlMessageRepository from './../../../modules/messages/infrastructure/persistence/mysql/MySqlMessageRepository';
import { MySqlTokenRepository } from '../../../modules/user-tokens/infrastructure/persistence/mysql/MySqlUserTokenRepository';
import { UserTokenEntity, UserTokenWithName } from '../../../modules/user-tokens/domain/user-token-entity';
import httpStatus from 'http-status';
import { SendMessageCommand, SendMessageResult } from './message.dto';
import container from './../../../dependency-injection';
import { ContactType } from './../../../modules/contacts/domain/contact-entity';
import { UserRestrictionValidator } from './../../../modules/user-restrictions/application/user-restriction-validator';
import { MySqlUserRestrictionRepository } from './../../../modules/user-restrictions/infrastructure/persistence/mysql/mysql-user-restriction-repository';
import { ContactFinder } from './../../../modules/contacts/application/contact-finder';
import { MySqlContactRepository } from './../../../modules/contacts/infrastructure/persistence/mysql/mysql-contact-repository';
import { GetGroupMembersCommand, GroupMembersListResult } from '../contacts/contact.dto';

export default class SendMessage implements BaseEndpoint {

    async run(_req: Request, res: Response): Promise<void>  {

        try {
            let tokenRepository = new MySqlTokenRepository(new MySqlRepository());
            
            var messageToSend: SendMessageCommand = _req.body.message as SendMessageCommand;
            var messageSender = new MessageSender(FirebaseMessaging.connect(), new MySqlMessageRepository(new MySqlRepository()), container.get('shared.logger'));
            var restrictionsValidator = new UserRestrictionValidator(new MySqlUserRestrictionRepository(new MySqlRepository()), container.get('shared.logger'));
            var contactFinder = new ContactFinder(new MySqlContactRepository(new MySqlRepository()), new MySqlUserRestrictionRepository(new MySqlRepository()), container.get('shared.logger'));
            let messageSended: SendMessageResult;

            let hasRestrictions: boolean = await restrictionsValidator.validate(messageToSend.deviceFromId, messageToSend.destinationId, messageToSend.destinationType, messageToSend.messageType);
            if (!hasRestrictions) {
                throw new Error("Usted no tiene permisos para realizar la acción.");
            }

            if (messageToSend.forGroup == 0) {
                var tokenFounded: UserTokenEntity = await tokenRepository.findUserTokenByUserIdAndType(messageToSend.destinationId, messageToSend.destinationType);
                if (tokenFounded == null) {
                    throw new Error("El usuario no tiene una cuenta activa.");
                }
                messageSended = await messageSender.sendMessageToDevice(messageToSend, tokenFounded.firebaseToken);
            }else {
                let command: GetGroupMembersCommand = {deviceFromId: messageToSend.deviceFromId, deviceFromType: messageToSend.deviceFromType, destinationId: messageToSend.destinationId, destinationType: messageToSend.destinationType};
                
                var groupMembers: GroupMembersListResult = await contactFinder.findGroupMembers(command);
                // switch(messageToSend.deviceFromType) {
                //     case ContactType.Tutor:
                //         tokens = await tokenRepository.findGroupForTutor(messageToSend.deviceFromId, messageToSend.destinationId);
                //         break;
                //     case ContactType.Student:
                //         tokens = await tokenRepository.findGroupForStudent(messageToSend.deviceFromId, messageToSend.destinationId);
                //         break;
                //     case ContactType.Teacher:
                //         tokens = await tokenRepository.findGroupForTeacher(messageToSend.deviceFromId, messageToSend.destinationId, messageToSend.destinationType);
                //         break; 
                //     case ContactType.Director:
                //         tokens = await tokenRepository.findGroupForDirector(messageToSend.deviceFromId, messageToSend.destinationId);
                //         break; 
                //     case ContactType.Staff:
                //         break; 
                // }
                
                for(let token of groupMembers.contacts) {
                    messageSended = await messageSender.sendMessageToDevice(messageToSend, token.userToken.firebaseToken);
                }
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json({ "message": messageSended });
        } catch(error) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(error.message);
        }
    }

}