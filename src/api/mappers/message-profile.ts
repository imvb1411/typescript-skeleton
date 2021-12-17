import { SendMessageCommand, SendMessageResult } from "api/endpoints/messages/message.dto";
import { MessageEntity } from "modules/messages/domain/message-entity";
import moment from "moment";
import { TypeMapper } from "ts-mapper";

export class MessageProfile extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {

        this.createMap<SendMessageCommand, MessageEntity>()
            .map(src => src.messageType, dest => dest.messageType)
            .map(src => src.deviceFromId, dest => dest.deviceFromId)
            .map(src => src.destinationId, dest => dest.destinationId)
            .map(src => src.data, dest => dest.data)
            .map(src => src.forGroup, dest => dest.forGroup)
            .map(src => moment(src.createdAt, 'YYYY-MM-DD HH:mm:ss'), dest => dest.createdAt);

        this.createMap<MessageEntity, SendMessageCommand>()
            .map(src => src.messageType, dest => dest.messageType)
            .map(src => src.deviceFromId, dest => dest.deviceFromId)
            .map(src => src.destinationId, dest => dest.destinationId)
            .map(src => src.data, dest => dest.data)
            .map(src => src.forGroup, dest => dest.forGroup)
            .map(src => moment(src.createdAt).format('YYYY-MM-DD HH:mm:ss'), dest => dest.createdAt);

        this.createMap<MessageEntity, SendMessageResult>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.state, dest => dest.state)
            .map(src => moment(src.sentAt).format('YYYY-MM-DD HH:mm:ss'), dest => dest.sentAt)
        ;

        this.createMap<SendMessageResult, MessageEntity>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.state, dest => dest.state)
            .map(src => moment(src.sentAt, 'YYYY-MM-DD HH:mm:ss'), dest => dest.sentAt)
        ;
    }
}