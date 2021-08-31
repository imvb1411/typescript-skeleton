import { MessageEntity } from "./../modules/Message/domain/message-entity";

export default interface IMessaging {
    sendMessage(message: MessageEntity, token: string);
    sendMessageToGroup(message : MessageEntity, token: string);
    synchronize(messages: Array<MessageEntity>): Promise<Array<MessageEntity>>;
}