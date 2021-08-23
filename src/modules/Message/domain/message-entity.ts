export class MessageEntity {
    readonly id            : string;
    readonly messageTypeId : number;
    readonly deviceFromId  : number;
    readonly destinationId : number;
    readonly data          : string;
    readonly forGroup      : number;
    readonly status        : number;
    readonly createdAt     : Date;
    readonly sendedAt      : Date;

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
}
