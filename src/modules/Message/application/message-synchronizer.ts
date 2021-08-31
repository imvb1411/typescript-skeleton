import { MessageEntity } from "./../domain/message-entity";
import MessageRepository from "./../domain/message-repository";

export default class MessageSynchronizer {

    constructor(private messageRepository: MessageRepository) { }
    
    async synchronize(message: MessageEntity) : Promise<Array<MessageEntity>> {
        return await this.messageRepository.getMissingMessagesFromMessageId(message);
    }
}