import MessageSynchronizer from "./../../modules/Message/application/message-synchronizer";
import { MessageEntity } from "./../../modules/Message/domain/message-entity";
import IMessaging from "./../IMessaging";

export default class FirebaseMessaging implements IMessaging {

    constructor(private synchronizer: MessageSynchronizer) { }

    async synchronize(messages: Array<MessageEntity>): Promise<Array<MessageEntity>> {
        var messagesSynchronized = new Array<MessageEntity>();
        await Promise.all(messages.map(async (message) => {
            const messagesSynchronizedAux = await this.synchronizer.synchronize(message);
            messagesSynchronized = messagesSynchronized.concat(messagesSynchronizedAux);
        }));
        console.log("synchronizer",messagesSynchronized);
        return messagesSynchronized;
    }

    async sendMessage(message: MessageEntity, token: string): Promise<MessageEntity> {
        throw new Error("Method not implemented.");
    }

    sendMessageToGroup(message: MessageEntity) {
        throw new Error("Method not implemented.");
    }

}