import { UserTokenEntity } from './../../token/domain/token-entity';
import Logger from "./../../../shared/domain/logger";
import { Uuid } from "./../../../shared/domain/value-object/Uuid";
import IMessaging from "./../../../shared/infrastructure/messaging/IMessaging";
import { MessageDestinationState, MessageEntity, MessageState } from "./../domain/message-entity";
import IMessageRepository from "./../domain/message-repository";
import { SendMessageCommand, SendMessageResult } from './../../../api/endpoints/messages/message.dto';
import { MessageProfile } from './../../../api/mappers/message-profile';
import moment from 'moment';

export default class MessageSender {

    private mapper: MessageProfile;

     constructor(private messaging: IMessaging, private messageRepository: IMessageRepository, private logger: Logger) {
        this.mapper = new MessageProfile();
     }

     async sendMessageToDevice(sendMessageCommand: SendMessageCommand, token: string): Promise<SendMessageResult> {
        let messageSended: MessageEntity;
        let rowInserted: number;
        let newMessage: MessageEntity = this.mapper.map<SendMessageCommand, MessageEntity>(sendMessageCommand, new MessageEntity());
        newMessage.id = Uuid.random().value;
        newMessage.createdAt = new Date(sendMessageCommand.createdAt);
        newMessage.sendedAt = new Date();
        newMessage.state = MessageState.Send;
        newMessage.destinationState = MessageDestinationState.Sent;

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
            const notificationsBody: string = await this.messageRepository.findNotificationBody(newMessage.destinationId);
            await this.messaging.sendMessageToDevice(newMessage, token, notificationsBody)
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
        let sendMessageResult: SendMessageResult = { id: null, state: null, sendedAt: null };
        sendMessageResult = this.mapper.map<MessageEntity, SendMessageResult>(newMessage, sendMessageResult);
        sendMessageResult.id = newMessage.id;
        sendMessageResult.state = newMessage.state;
        sendMessageResult.sendedAt = moment(newMessage.sendedAt).format('YYYY-MM-DD HH:mm:ss');
        return sendMessageResult;
    }

    async sendMessageToGroup(command: SendMessageCommand,) : Promise<MessageEntity> {
        let tokens: UserTokenEntity[];
        return null;
    }
}