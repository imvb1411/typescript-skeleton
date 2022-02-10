import { MessageEntity } from "./message-entity";

export interface IMessageRepository {
    save(messageEntity : MessageEntity): Promise<number>;
    updateDestinationState(destinationState: number, receivedAt: Date, id: string): Promise<number>;
    findNotificationBody(messageEntity : MessageEntity): Promise<string>;
}