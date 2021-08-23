export class TokenEntity {
    readonly id            : number;
    readonly userId        : number;
    readonly firebaseToken : string;
    readonly status        : number;
    readonly createdAt     : Date;
    readonly updatedAt     : Date;

    constructor(
            id            : number,
            userId        : number,
            firebaseToken : string,
            status        : number,
            createdAt     : Date,
            updatedAt     : Date) {
        this.id            = id           ;
        this.userId        = userId       ;
        this.firebaseToken = firebaseToken;
        this.status        = status       ;
        this.createdAt     = createdAt ;
        this.updatedAt     = updatedAt ;
    }
}