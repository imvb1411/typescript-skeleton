import Logger from "../../../shared/domain/logger";
import { Uuid } from "../../../shared/domain/value-object/Uuid";
import { IMessaging } from "../../../shared/infrastructure/messaging/IMessaging";
import { MessageDestinationState, MessageEntity, MessageState, MessageType } from "../domain/message-entity";
import { IMessageRepository } from "../domain/message-repository";
import { SendMessageCommand, SendMessageResult } from '../../../api/endpoints/messages/message.dto';
import { MessageProfile } from '../../../api/mappers/message-profile';
import moment from 'moment';
import { MultimediaEntity } from '../domain/multimedia-entity';

export class MessageSender {

    private mapper: MessageProfile;
     constructor(private messaging: IMessaging, private messageRepository: IMessageRepository, private logger: Logger) {
        this.mapper = new MessageProfile();
     }

    async sendMessageToDevice(sendMessageCommand: SendMessageCommand, token: string): Promise<SendMessageResult> {

        let rowInserted: number;
        let newMessage: MessageEntity = this.mapper.map<SendMessageCommand, MessageEntity>(sendMessageCommand, new MessageEntity());
        newMessage.id = Uuid.random().value;
        newMessage.deviceFromType = sendMessageCommand.deviceFromType;
        newMessage.groupId = sendMessageCommand.groupId;
        newMessage.groupType = sendMessageCommand.groupType;
        newMessage.destinationType = sendMessageCommand.destinationType;
        newMessage.createdAt = new Date(sendMessageCommand.createdAt);
        newMessage.sentAt = new Date();
        newMessage.state = MessageState.Send;
        newMessage.destinationState = MessageDestinationState.Sent;
        if (newMessage.messageType != MessageType.Text) {
            let multimedia: MultimediaEntity = new MultimediaEntity();
            multimedia.id = sendMessageCommand.multimedia.id;
            multimedia.messageId = newMessage.id;
            multimedia.firebaseUri = sendMessageCommand.multimedia.firebaseUri;
            newMessage.multimedia = multimedia;
        }
        
        if(newMessage) {         
            await this.messageRepository.save(newMessage)
                .then(e => {
                    this.logger.info("MessageSender: rowsInserted" + e + " ,messageInserted -> " + JSON.stringify(newMessage));
                    rowInserted = e;
                })
                .catch(e => {
                    this.logger.error("MessageSenderError: " + e);
                    rowInserted = 0;
                });
        }

        if (rowInserted > 0) {
            const notificationsBody: string = await this.messageRepository.findNotificationBody(newMessage);

            await this.messaging.sendMessageToDevice(newMessage, token, notificationsBody)
            .then(e => {
                this.logger.info("MessageSender: sendMessage->" + JSON.stringify(e) + " ,token: " + token);                  
            })
            .catch(e => {
                this.logger.error("MessageSender: error->" + e);
                throw e;
            });
        } 
        let sendMessageResult: SendMessageResult = { id: null, messageType: null, deviceFromType: null, state: null, sentAt: null, multimedia: null };
        sendMessageResult = this.mapper.map<MessageEntity, SendMessageResult>(newMessage, sendMessageResult);
        sendMessageResult.id = newMessage.id;
        sendMessageResult.messageType = newMessage.messageType;
        sendMessageResult.deviceFromType = newMessage.deviceFromType;
        sendMessageResult.state = newMessage.state;
        sendMessageResult.sentAt = moment(newMessage.sentAt).format('YYYY-MM-DD HH:mm:ss');
        sendMessageResult.multimedia = sendMessageCommand.multimedia;
        return sendMessageResult;
    }
}