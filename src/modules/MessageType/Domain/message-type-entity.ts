export class MessageTypeEntity {
    readonly id          : number;
    readonly description : string;
    readonly status      : number;
    readonly createdAt   : Date;
    readonly userCreator : number;

    constructor(
        id          : number,
        description : string,
        status      : number,
        createdAt   : Date,
        userCreator : number)
    {
        this.id          = id          ;
        this.description = description ;
        this.status      = status      ;
        this.createdAt   = createdAt   ;
        this.userCreator = userCreator ;
    }
}