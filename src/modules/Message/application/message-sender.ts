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
                    this.logger.info("MessageSender:" + e);
                    rowInserted = e;
                })
                .catch(e => {
                    this.logger.error("MessageSender:" + e);
                    rowInserted = 0;
                });
        }

        if (rowInserted > 0) {
            const notificationBody: string = await this.messageRepository.findNotificationBody(messageEntity.destinationId);
            await this.messaging.sendMessageToDevice(messageEntity, token, notificationBody)
            .then(e => {
                this.logger.info("MessageSender:" + e);
                messageSended = e;                       
            })
            .catch(e => {
                this.logger.error("MessageSender:" + e);
                messageSended = null;
            });
        }               
        return messageEntity;
    }
}