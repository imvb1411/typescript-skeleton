import MessageRepository from "modules/Message/domain/message-repository";
import { MySqlRepository } from "shared/infrastructure/persistence/MySqlRepository";
import MessageSender from "./../../modules/Message/application/firebase-message-sender";
import { MessagesResponse } from "./../../modules/Message/application/messages-response";
import { MessageEntity } from "./../../modules/Message/domain/message-entity";
import IMessaging from "./../IMessaging";

export default class FirebaseMessaging implements IMessaging {

    constructor(private sender: MessageSender, private messageRepository: MessageRepository) { 
        
    }

    async synchronize(messages: Array<MessageEntity>): Promise<Array<MessageEntity>>  {
        throw new Error("Method not implemented.");
    }

    async sendMessage(message: MessageEntity, token: string): Promise<MessageEntity> {
        const inserts = this.messageRepository.insert(message);
        return this.sender.sendMessage(message, token);        
    }

    sendMessageToGroup(message: MessageEntity) {
        throw new Error("Method not implemented.");
    }

}