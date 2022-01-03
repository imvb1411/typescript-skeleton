import IMessageRepository from "../../../domain/message-repository";
import moment from "moment";
import IRepository from "../../../../../shared/infrastructure/persistence/IRepository";
import { MySqlRepository } from "../../../../../shared/infrastructure/persistence/MySqlRepository";
import { MessageEntity, MessageType } from "../../../domain/message-entity";
import * as fs from 'fs';

export default class MySqlMessageRepository extends MySqlRepository implements IMessageRepository{

    constructor(private repository: IRepository) {
        super();
    }
    
    async save(messageEntity: MessageEntity): Promise<number> {
        var sql = "insert into messages values('" + messageEntity.id + "'," 
                                                    + messageEntity.messageType + ",'" 
                                                    + messageEntity.deviceFromId + "'," 
                                                    + messageEntity.deviceFromType + ",'"
                                                    + messageEntity.destinationId + "'," 
                                                    + messageEntity.destinationType + ",'"
                                                    + messageEntity.data + "'," 
                                                    + messageEntity.forGroup + "," 
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

    async updateDestinationState(message: MessageEntity): Promise<number> {
        var sql = "update messages set destinationState = " + message.destinationState + ", receivedAt = '" + moment(message.receivedAt).format("yyyy-MM-DD HH:mm:ss") + "' where id = '" + message.id + "';"
        console.log(sql);
        const query = await this.repository.executeInsert(sql);
        return query;
    }

    async findNotificationBody(destinationType: number, destinationId: string): Promise<string> {
        let notificationsBody : string;
        let sql: string = fs.readFileSync(__dirname + '\\queries\\GetNotificationBody.sql', 'utf-8');
        let params: string[] = [destinationType.toString(), destinationId ]
        const query = await this.repository.executeSelectWithParams(sql, params);
        query.map(function(item: { body: string; }) {
            notificationsBody = item.body;
        });
        return notificationsBody;
    }
}