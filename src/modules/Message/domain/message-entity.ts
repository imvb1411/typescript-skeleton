import { MessageTypeEntity } from "modules/MessageType/Domain/message-type-entity";
import moment from "moment";

export class MessageEntity {

    id                     : string;
    readonly messageTypeId : number;
    readonly deviceFromId  : number;
    readonly destinationId : number;
    data                   : string;
    readonly forGroup      : number;
    destinationStatus      : number;
    readonly status        : number;
    createdAt              : Date;
    sendedAt               : Date;
    receivedAt             : Date;

    constructor(
        id                : string,
        messageTypeId     : number,
        deviceFromId      : number,
        destinationId     : number,
        data              : string,
        forGroup          : number,
        destinationStatus : number,
        status            : number,
        createdAt         : Date,
        sendedAt          : Date,
        receivedAt        : Date)
    {
        this.id                = id           ;
        this.messageTypeId     = messageTypeId;
        this.deviceFromId      = deviceFromId ;
        this.destinationId     = destinationId;
        this.data              = data         ;
        this.forGroup          = forGroup     ;
        this.destinationStatus = destinationStatus ;
        this.status            = status       ;
        this.createdAt         = createdAt    ;
        this.sendedAt          = sendedAt     ;
        this.receivedAt        = receivedAt     ;
    }
    
    public static fromPrimitive(data : {
        id                               : string,
        messageTypeId                    : number,
        deviceFromId                     : number,
        destinationId                    : number,
        data                             : string,
        forGroup                         : number,
        destinationStatus                : number,
        status                           : number,
        createdAt                        : Date,
        sendedAt                         : Date,
        receivedAt                       : Date
    })                               : MessageEntity {
        return new MessageEntity(data.id, 
            data.messageTypeId, 
            data.deviceFromId, 
            data.destinationId, 
            data.data,
            data.forGroup, 
            data.destinationStatus,
            data.status, 
            data.createdAt, 
            data.sendedAt,
            data.receivedAt);
    }

    toPrimitive() {
        return {
            id                 : this.id
            ,messageTypeId     : this.messageTypeId.toString()
            ,deviceFromId      : this.deviceFromId.toString()
            ,destinationId     : this.destinationId.toString()
            ,data              : this.data
            ,forGroup          : this.forGroup.toString()
            ,destinationStatus : this.destinationStatus.toString()
            ,status            : this.status.toString()
            ,createdAt         : moment(this.createdAt).format("yyyy-MM-DD HH:mm:ss")
            ,sendedAt          : moment(this.sendedAt).format("yyyy-MM-DD HH:mm:ss")
            ,receivedAt        : moment(this.receivedAt).format("yyyy-MM-DD HH:mm:ss")
        }
    }
}
