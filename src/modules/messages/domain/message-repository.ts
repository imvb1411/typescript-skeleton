import { MessageEntity } from "./message-entity";

export default interface IMessageRepository {
    save(messageEntity : MessageEntity): Promise<number>;
    update(message : MessageEntity): Promise<number>;
    updateStatusDestination(message: MessageEntity): Promise<number>;
    findPendingMessages(destinationId : string): Promise<Array<MessageEntity>>;
    findNotificationBody(destinationId: string): Promise<string>;
}