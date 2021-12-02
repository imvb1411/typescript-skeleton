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
        var sql = "insert into messages values('" + messageEntity.id + "'," 
                                                    + messageEntity.messageTypeId + ",'" 
                                                    + messageEntity.deviceFromId + "','" 
                                                    + messageEntity.destinationId + "','" 
                                                    + messageEntity.data + "'," 
                                                    + messageEntity.forGroup + "," 
                                                    + messageEntity.destinationStatus + ","
                                                    + messageEntity.status + ",'" 
                                                    + moment(messageEntity.createdAt).format("yyyy-MM-DD HH:mm:ss") + "','" 
                                                    + moment(messageEntity.sendedAt).format("yyyy-MM-DD HH:mm:ss") + "'," 
                                                    + (messageEntity.receivedAt == null?null: "'" + moment(messageEntity.receivedAt).format("yyyy-MM-DD HH:mm:ss") + "'") + ");"
        console.log(sql);
        const query = await this.repository.executeInsert(sql);
        return query;
    }

    async update(messageEntity: MessageEntity): Promise<number> {
        var sql = "call proc_chat_update_message('" + messageEntity.id + "'," 
                                                    + messageEntity.messageTypeId + "," 
                                                    + messageEntity.deviceFromId + ",'" 
                                                    + messageEntity.destinationId + "','" 
                                                    + messageEntity.data + "'," 
                                                    + messageEntity.forGroup + "," 
                                                    + messageEntity.destinationStatus + ","
                                                    + messageEntity.status + ",'" 
                                                    + moment(new Date(messageEntity.createdAt).toISOString()).format("yyyy-MM-DD HH:mm:ss") + "','" 
                                                    + moment(new Date(messageEntity.sendedAt).toISOString()).format("yyyy-MM-DD HH:mm:ss") + "','" 
                                                    + moment(new Date(messageEntity.receivedAt).toISOString()).format("yyyy-MM-DD HH:mm:ss") + "');"
        const query = await this.repository.executeSqlStatement(sql);
        return query[0].affectedRows;
    }

    async updateStatusDestination(message: MessageEntity): Promise<number> {
        var sql = "update messages set destinationStatus = " + message.destinationStatus + ", receivedAt = '" + moment(message.receivedAt).format("yyyy-MM-DD HH:mm:ss") + "' where id = '" + message.id + "';"
        console.log(sql);
        const query = await this.repository.executeInsert(sql);
        return query;
    }

    async findPendingMessages(destinationId: string): Promise<Array<MessageEntity>> {
        let messages: Array<MessageEntity> = new Array<MessageEntity>();
        let sql = "call proc_chat_mensajes_pendientes_by_destinationId('" + destinationId + "');";
        const query = await this.repository.executeSqlStatement(sql);
        query.map(function(item : {
            id                      : string;
            messageTypeId           : number;
            deviceFromId            : number;
            destinationId           : string;
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

    async findNotificationBody(destinationId: string): Promise<string> {
        let notificationsBody : string;
        let sql = "call proc_chat_cuerpo_notificacion('" + destinationId + "');";
        const query = await this.repository.executeSqlStatement(sql);
        query.map(function(item:{ body: string}) {
            notificationsBody = item.body;
        })
        return notificationsBody;
    }
}