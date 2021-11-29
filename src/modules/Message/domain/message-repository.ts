import { MessageEntity } from "./message-entity";

export default interface IMessageRepository {
    save(messageEntity : MessageEntity): Promise<number>;
    update(message : MessageEntity): Promise<number>;
    updateStatusDestionation(messageId: string);
    findPendingMessages(destinationId : string): Promise<Array<MessageEntity>>;
    findNotificationBody(destinationId: string): Promise<string>;
}