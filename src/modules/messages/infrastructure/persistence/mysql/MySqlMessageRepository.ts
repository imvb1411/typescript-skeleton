import IMessageRepository from "../../../domain/message-repository";
import moment from "moment";
import { IRepository } from "../../../../../shared/infrastructure/persistence/IRepository";
import { MySqlRepository } from "../../../../../shared/infrastructure/persistence/mysql/MySqlRepository";
import { MessageEntity, MessageType } from "../../../domain/message-entity";
import * as fs from 'fs';

export default class MySqlMessageRepository implements IMessageRepository{

    constructor(private repository: IRepository) { }
    
    async save(messageEntity: MessageEntity): Promise<number> {
        var sql = "insert into messages values('" + messageEntity.id + "'," 
                                                    + messageEntity.messageType + ",'" 
                                                    + messageEntity.deviceFromId + "'," 
                                                    + messageEntity.deviceFromType + ",'"
                                                    + messageEntity.destinationId + "'," 
                                                    + messageEntity.destinationType + ",'"
                                                    + messageEntity.data + "','" 
                                                    + messageEntity.groupId + "'," 
                                                    + messageEntity.groupType + ","
                                                    + messageEntity.destinationState + ","
                                                    + messageEntity.state + ",'" 
                                                    + moment(messageEntity.createdAt).format("yyyy-MM-DD HH:mm:ss") + "','" 
                                                    + moment(messageEntity.sentAt).format("yyyy-MM-DD HH:mm:ss") + "'," 
                                                    + (messageEntity.receivedAt == null?null: "'" + moment(messageEntity.receivedAt).format("yyyy-MM-DD HH:mm:ss") + "'") + ");"
        console.log(sql);
        const query = await this.repository.executeInsert(sql);
        if (messageEntity.messageType != MessageType.Text) {
            sql = "insert into multimedia values('" + messageEntity.multimedia.id + "', '" + messageEntity.multimedia.messageId + "','" + messageEntity.multimedia.firebaseUri + "');"
            console.log(sql);
            await this.repository.executeInsert(sql);
        }
        return query;
    }

    async updateDestinationState(destinationState: number, receivedAt: Date, id: string): Promise<number> {
        var sql = "update messages set destinationState = " + destinationState + ", receivedAt = '" + moment(receivedAt).format("yyyy-MM-DD HH:mm:ss") + "' where id = '" + id + "';"
        console.log(sql);
        const query = await this.repository.executeInsert(sql);
        return query;
    }

    async findNotificationBody(messageEntity : MessageEntity): Promise<string> {
        let notificationsBody : string;
        let sql: string = fs.readFileSync(__dirname + '/queries/GetNotificationBody.sql', 'utf-8');
        let params: string[] = [messageEntity.deviceFromId, messageEntity.deviceFromType.toString(), messageEntity.groupId, messageEntity.groupType.toString(), messageEntity.destinationId, messageEntity.destinationType.toString() ]
        const query = await this.repository.executeSelectWithParams(sql, params);
        query.map(function(item: { body: string; }) {
            notificationsBody = item.body;
        });
        return notificationsBody;
    }
}