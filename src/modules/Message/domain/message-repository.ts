import moment from "moment";
import IRepository from "./../../../shared/infrastructure/persistence/IRepository";
import { MessageEntity } from "./message-entity";

export default class MessageRepository {

    constructor(private repository: IRepository) {}

    async getMissingMessagesFromMessageId(message: MessageEntity): Promise<Array<MessageEntity>> {
        let messages: Array<MessageEntity> = new Array<MessageEntity>();
        const query = await this.repository.executeSqlStatement("call proc_chat_mensajes_pendientes_by_messageId ('" 
                                                                    + message.id + "'," 
                                                                    + message.deviceFromId + "," 
                                                                    + message.destinationId + ");");
        query.map(function(item) {
            messages.push(MessageEntity.fromPrimitive(item));
        });
        return messages;
    }

    async insert(message: MessageEntity): Promise<number> {
        const query = await this.repository.
                                    executeInsert("insert into messages (id, messageTypeId, deviceFromId, destinationId, data, forGroup, status, createdAt, sendedAt) " 
                                            + "values ('" 
                                            + message.id + "'," 
                                            + message.messageTypeId + "," 
                                            + message.deviceFromId + "," 
                                            + message.destinationId + ",'" 
                                            + message.data + "'," 
                                            + message.forGroup + "," 
                                            + message.status + ",'" 
                                            + moment(message.createdAt).format("yyyy-MM-DD HH:mm:ss") + "','" 
                                            + moment(message.sendedAt).format("yyyy-MM-DD HH:mm:ss") + "');");
        return query;
    }
}