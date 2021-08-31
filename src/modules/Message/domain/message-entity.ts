import { MessageTypeEntity } from "modules/MessageType/Domain/message-type-entity";
import moment from "moment";

export class MessageEntity {

    id                     : string;
    readonly messageTypeId : number;
    readonly deviceFromId  : number;
    readonly destinationId : number;
    data                   : string;
    readonly forGroup      : number;
    readonly status        : number;
    createdAt     : Date;
    sendedAt      : Date;

    constructor(
        id            : string,
        messageTypeId : number,
        deviceFromId  : number,
        destinationId : number,
        data          : string,
        forGroup      : number,
        status        : number,
        createdAt     : Date,
        sendedAt      : Date)
    {
        this.id            = id           ;
        this.messageTypeId = messageTypeId;
        this.deviceFromId  = deviceFromId ;
        this.destinationId = destinationId;
        this.data          = data         ;
        this.forGroup      = forGroup     ;
        this.status        = status       ;
        this.createdAt     = createdAt    ;
        this.sendedAt      = sendedAt     ;
    }
    
    public static fromPrimitive(data: {
        id            : string,
        messageTypeId : number,
        deviceFromId  : number,
        destinationId : number,
        data          : string,
        forGroup      : number,
        status        : number,
        createdAt     : Date,
        sendedAt      : Date
    }): MessageEntity {
        return new MessageEntity(data.id, 
            data.messageTypeId, 
            data.deviceFromId, 
            data.destinationId, 
            data.data,
            data.forGroup, 
            data.status, 
            data.createdAt, 
            data.sendedAt);
    }

    toPrimitive() {
        return {
            id             : this.id           
            ,messageTypeId : this.messageTypeId.toString()
            ,deviceFromId  : this.deviceFromId.toString() 
            ,destinationId : this.destinationId.toString()
            ,data          : this.data         
            ,forGroup      : this.forGroup.toString()     
            ,status        : this.status.toString()       
            ,createdAt     : moment(this.createdAt).format("yyyy-MM-DD HH:mm:ss")    
            ,sendedAt      : moment(this.sendedAt).format("yyyy-MM-DD HH:mm:ss")            
        }
    }
}
