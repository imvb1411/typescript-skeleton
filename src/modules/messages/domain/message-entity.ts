import moment from "moment";

export class MessageEntity {

    id                     : string;
    readonly messageType   : MessageType;
    readonly deviceFromId  : number;
    deviceFromType : number;
    destinationId : string;
    destinationType : number;
    data                   : string;
    readonly forGroup      : number;
    destinationState       : MessageDestinationState;
    state                  : MessageState;
    createdAt              : Date;
    sentAt               : Date;
    receivedAt             : Date;

    constructor() {}
    // constructor(
    //     id                : string,
    //     messageTypeId     : number,
    //     deviceFromId      : number,
    //     destinationId     : string,
    //     data              : string,
    //     forGroup          : number,
    //     destinationStatus : number,
    //     status            : number,
    //     createdAt         : Date,
    //     sendedAt          : Date,
    //     receivedAt        : Date)
    // {
    //     this.id                = id           ;
    //     this.messageTypeId     = messageTypeId;
    //     this.deviceFromId      = deviceFromId ;
    //     this.destinationId     = destinationId;
    //     this.data              = data         ;
    //     this.forGroup          = forGroup     ;
    //     this.destinationState = destinationStatus ;
    //     this.state            = status       ;
    //     this.createdAt         = createdAt    ;
    //     this.sendedAt          = sendedAt     ;
    //     this.receivedAt        = receivedAt     ;
    // }

    // public static fromPrimitive(data : {
    //     id                               : string,
    //     messageTypeId                    : number,
    //     deviceFromId                     : number,
    //     destinationId                    : string,
    //     data                             : string,
    //     forGroup                         : number,
    //     destinationStatus                : number,
    //     status                           : number,
    //     createdAt                        : Date,
    //     sendedAt                         : Date,
    //     receivedAt                       : Date
    // })                               : MessageEntity {
    //     return new MessageEntity(data.id,
    //         data.messageTypeId, 
    //         data.deviceFromId, 
    //         data.destinationId, 
    //         data.data,
    //         data.forGroup, 
    //         data.destinationStatus,
    //         data.status, 
    //         data.createdAt, 
    //         data.sendedAt,
    //         data.receivedAt);
    // }

    // toPrimitive() {
    //     return {
    //         id                 : this.id
    //         ,messageTypeId     : this.messageTypeId.toString()
    //         ,deviceFromId      : this.deviceFromId.toString()
    //         ,destinationId     : this.destinationId.toString()
    //         ,data              : this.data
    //         ,forGroup          : this.forGroup.toString()
    //         ,destinationStatus : this.destinationState.toString()
    //         ,status            : this.state.toString()
    //         ,createdAt         : moment(this.createdAt).format("yyyy-MM-DD HH:mm:ss")
    //         ,sendedAt          : moment(this.sendedAt).format("yyyy-MM-DD HH:mm:ss")
    //         ,receivedAt        : moment(this.receivedAt).format("yyyy-MM-DD HH:mm:ss")
    //     }
    // }
}

export enum MessageType {
    Text = 1,
    TextWithImage = 2,
    TextWithVideo = 3,
    Audio = 4,
    Document = 5
}

export enum MessageState {
    Create = 0,
    Send = 1,
    Error = 2
}

export enum MessageDestinationState {
    Create = 0,
    Sent = 1,
    Received = 2,
    Read = 3
}