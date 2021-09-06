import IMessageRepository from "./../../../domain/message-repository";
import moment from "moment";
import IRepository from "./../../../../../shared/infrastructure/persistence/IRepository";
import { MySqlRepository } from "./../../../../../shared/infrastructure/persistence/MySqlRepository";
import { MessageEntity } from "./../../../domain/message-entity";

export default class MySqlMessageRepository extends MySqlRepository implements IMessageRepository{

    constructor(private repository: IRepository) {
        super();
    }

    async save(messageEntity: MessageEntity): Promise<number> {
        var sql = "call proc_chat_insert_message('" + messageEntity.id + "'," 
                                                    + messageEntity.messageTypeId + "," 
                                                    + messageEntity.deviceFromId + "," 
                                                    + messageEntity.destinationId + ",'" 
                                                    + messageEntity.data + "'," 
                                                    + messageEntity.forGroup + "," 
                                                    + messageEntity.destinationStatus + ","
                                                    + messageEntity.status + ",'" 
                                                    + moment(messageEntity.createdAt).format("yyyy-MM-DD HH:mm:ss") + "','" 
                                                    + moment(messageEntity.sendedAt).format("yyyy-MM-DD HH:mm:ss") + "','" 
                                                    + moment(messageEntity.receivedAt).format("yyyy-MM-DD HH:mm:ss") + "');"
        const query = await this.repository.executeSqlStatement(sql);
        return query[0].affectedRows;
    }

    async update(messageEntity: MessageEntity): Promise<number> {
        var sql = "call proc_chat_update_message('" + messageEntity.id + "'," 
                                                    + messageEntity.messageTypeId + "," 
                                                    + messageEntity.deviceFromId + "," 
                                                    + messageEntity.destinationId + ",'" 
                                                    + messageEntity.data + "'," 
                                                    + messageEntity.forGroup + "," 
                                                    + messageEntity.destinationStatus + ","
                                                    + messageEntity.status + ",'" 
                                                    + moment(new Date(messageEntity.createdAt).toISOString()).format("yyyy-MM-DD HH:mm:ss") + "','" 
                                                    + moment(new Date(messageEntity.sendedAt).toISOString()).format("yyyy-MM-DD HH:mm:ss") + "','" 
                                                    + moment(new Date(messageEntity.receivedAt).toISOString()).format("yyyy-MM-DD HH:mm:ss") + "');"
        console.log(sql);
        const query = await this.repository.executeSqlStatement(sql);
        console.log(query);
        return query[0].affectedRows;
    }

    async findPendingMessages(destinationId: number): Promise<Array<MessageEntity>> {
        let messages: Array<MessageEntity> = new Array<MessageEntity>();
        let sql = "call proc_chat_mensajes_pendientes_by_destinationId(" + destinationId + ");";
        const query = await this.repository.executeSqlStatement(sql);
        query.map(function(item : {
            id                      : string;
            messageTypeId           : number;
            deviceFromId            : number;
            destinationId           : number;
            data                    : string;
            forGroup                : number;
            destinationStatus       : number;
            status                  : number;
            createdAt               : Date;
            sendedAt                : Date;
            receivedAt              : Date; }) {
        messages.push(MessageEntity.fromPrimitive(item));
        });
        return messages;
    }

    async findNotificationBody(destinationId: number): Promise<string> {
        let sql = "call proc_chat_cuerpo_notificacion(" + destinationId + ");";
        const query = await this.repository.executeSqlStatement(sql);
        console.log(query);
        const bodyNotification = query[0].body;
        return bodyNotification;
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