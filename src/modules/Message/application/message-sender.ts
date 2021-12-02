import { UserEntity } from 'modules/user/domain/user-entity';
import container from './../../../dependency-injection';
import Logger from "./../../../shared/domain/logger";
import { Uuid } from "./../../../shared/domain/value-object/Uuid";
import IMessaging from "./../../../shared/infrastructure/messaging/IMessaging";
import { MessageEntity } from "./../domain/message-entity";
import IMessageRepository from "./../domain/message-repository";

export default class MessageSender {

    private logger : Logger;
    
     constructor(private messaging: IMessaging, private messageRepository: IMessageRepository) {
        this.logger = container.get('shared.logger');
     }

     async sendMessageToDevice(messageEntity: MessageEntity, token: string): Promise<MessageEntity> {
        let messageSended: MessageEntity;
        let rowInserted: number;
        messageEntity.id = Uuid.random().value;
        messageEntity.sendedAt = new Date();
        if(messageEntity) {         
            await this.messageRepository.save(messageEntity)
                .then(e => {
                    this.logger.info("MessageSender: rowsInserted" + e + " ,messageInserted -> " + JSON.stringify(messageEntity));
                    rowInserted = e;
                })
                .catch(e => {
                    this.logger.error("MessageSenderError: " + e);
                    rowInserted = 0;
                });
        }

        if (rowInserted > 0) {
            const notificationsBody: string = await this.messageRepository.findNotificationBody(messageEntity.destinationId);
            await this.messaging.sendMessageToDevice(messageEntity, token, notificationsBody)
            .then(e => {
                this.logger.info("MessageSender: sendMessage->" + JSON.stringify(e) + " ,token: " + token);
                messageSended = e;                       
            })
            .catch(e => {
                this.logger.error("MessageSender: error->" + e);
                messageSended = null;
                throw e;
            });
        }               
        return messageEntity;
    }

    async sendMessageToGroup(messageEntity: MessageEntity) : Promise<MessageEntity> {

        return null;
    }
}