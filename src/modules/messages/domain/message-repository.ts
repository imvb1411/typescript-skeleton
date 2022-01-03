import { MessageEntity } from "./message-entity";

export default interface IMessageRepository {
    save(messageEntity : MessageEntity): Promise<number>;
    updateDestinationState(message: MessageEntity): Promise<number>;
    findNotificationBody(destinationType: number, destinationId: string): Promise<string>;
}