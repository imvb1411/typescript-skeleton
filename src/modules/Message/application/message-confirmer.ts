import { textSpanContainsTextSpan } from "typescript";
import { MessageEntity } from "./../domain/message-entity";
import MySqlMessageRepository from "./../infrastructure/persistence/mysql/MySqlMessageRepository";

export default class MessageConfirmer {
    constructor(private messageRepository: MySqlMessageRepository) {}

    async confirmReceivedMessage(messages: Array<MessageEntity>): Promise<number> {
        let index = 0;
        for (;index < messages.length; index++) {
            var message = messages[index];
            message.destinationStatus = 1;
            await this.messageRepository.update(message);
        }
        return index;
    }
}