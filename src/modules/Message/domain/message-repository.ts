import { MessageEntity } from "./message-entity";

export default interface IMessageRepository {
    save(messageEntity : MessageEntity): Promise<number>;
    update(message : MessageEntity): Promise<number>;
    findPendingMessages(destinationId : number): Promise<Array<MessageEntity>>;
    findNotificationBody(destinationId: number): Promise<string>;
}