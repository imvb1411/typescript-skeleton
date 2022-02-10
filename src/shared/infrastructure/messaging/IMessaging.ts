import { MessageEntity } from "./../../../modules/messages/domain/message-entity";

export interface IMessaging {
    sendMessageToDevice(messageEntity: MessageEntity, token: string, notificationBody: string): Promise<MessageEntity>;
    sendMessageToGroup(): Promise<Array<MessageEntity>>;
}