import { MessageEntity } from "../domain/message-entity";

export class MessagesResponse {
    readonly messages: Array<MessageEntity>;

    constructor(messages: Array<MessageEntity>) {
        this.messages = messages;
    }
}