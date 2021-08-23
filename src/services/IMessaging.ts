import { MessageEntity } from "modules/Message/domain/message-entity";

export interface IMessaging {
    sendMessage(message        : MessageEntity);
    sendMessageToGroup(message : MessageEntity);
}