import { Request, Response } from 'express';
import { BaseEndpoint } from "../base.endpoint";
import { MessageSender } from '../../../modules/messages/application/MessageSender';
import { MySqlUserTokenRepository } from '../../../modules/user-tokens/infrastructure/persistence/mysql/MySqlUserTokenRepository';
import { UserTokenEntity } from '../../../modules/user-tokens/domain/user-token-entity';
import httpStatus from 'http-status';
import { SendMessageCommand, SendMessageResult } from './message.dto';
import { UserRestrictionValidator } from '../../../modules/user-restrictions/application/UserRestrictionValidator';
import { ContactFinder } from '../../../modules/contacts/application/ContactFinder';
import { GetGroupMembersCommand, GroupMembersListResult } from '../contacts/contact.dto';

export class SendMessage implements BaseEndpoint {

    constructor(
        private messageSender: MessageSender
        , private userRestrictionValidator: UserRestrictionValidator
        , private contactFinder: ContactFinder
        , private userTokenRepository: MySqlUserTokenRepository) {}

    async run(_req: Request, res: Response): Promise<void>  {

        try {
            var messageToSend: SendMessageCommand = _req.body.message as SendMessageCommand;

            let messageSended: SendMessageResult;
            let hasRestrictions: boolean = await this.userRestrictionValidator.validate(messageToSend.deviceFromId, messageToSend.destinationId, messageToSend.destinationType, messageToSend.messageType);
            if (!hasRestrictions) {
                throw new Error("Usted no tiene permisos para realizar la acción.");
            }

            if (messageToSend.groupId == '') {
                var tokenFounded: UserTokenEntity = await this.userTokenRepository.findUserTokenByUserIdAndType(messageToSend.destinationId, messageToSend.destinationType);
                if (tokenFounded == null) {
                    throw new Error("El usuario no tiene una cuenta activa.");
                }
                messageSended = await this.messageSender.sendMessageToDevice(messageToSend, tokenFounded.firebaseToken);
            }else {
                let command: GetGroupMembersCommand = {deviceFromId: messageToSend.deviceFromId, deviceFromType: messageToSend.deviceFromType, destinationId: messageToSend.destinationId, destinationType: messageToSend.destinationType};
                
                var groupMembers: GroupMembersListResult = await this.contactFinder.findGroupMembers(command);
                
                for(let token of groupMembers.contacts) {
                    messageToSend.destinationId = token.userToken.userId;
                    messageToSend.destinationType = token.userToken.userType;
                    messageSended = await this.messageSender.sendMessageToDevice(messageToSend, token.userToken.firebaseToken);
                }
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.status(httpStatus.OK).json({ "message": messageSended });
        } catch(error) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(error.message);
        }
    }

}