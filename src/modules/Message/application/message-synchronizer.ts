import { MessageEntity } from "./../domain/message-entity";
import MessageRepository from "./../domain/message-repository";

export default class MessageSynchronizer {

    constructor(private messageRepository: MessageRepository) { }
    
    async synchronize(owerId: number) : Promise<Array<MessageEntity>> {
        return await this.messageRepository.findPendingMessages(owerId);
    }

    async getPendingMessages(destinationId: number): Promise<Array<MessageEntity>> {
        return await this.messageRepository.findPendingMessages(destinationId);
    }
}