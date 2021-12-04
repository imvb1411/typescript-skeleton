import moment from "moment";

export class TokenEntity {
    readonly id            : string;
    readonly userId        : string;
    readonly userType : number;
    readonly firebaseToken : string;
    readonly status        : number;
    readonly createdAt     : Date;
    readonly updatedAt     : Date;

    constructor(
            id            : string,
            userId        : string,
            userType      : number,
            firebaseToken : string,
            status        : number,
            createdAt     : Date,
            updatedAt     : Date) {
        this.id            = id           ;
        this.userId        = userId       ;
        this.userType = userType ;
        this.firebaseToken = firebaseToken;
        this.status        = status       ;
        this.createdAt     = createdAt ;
        this.updatedAt     = updatedAt ;
    }

    public static fromPrimitive(data : {
        id            : string,
        userId        : string,
        userType : number,
        firebaseToken : string,
        status        : number,
        createdAt     : Date,
        updatedAt     : Date
    })                               : TokenEntity {
        return new TokenEntity(
            data.id           
            ,data.userId       
            ,data.userType
            ,data.firebaseToken
            ,data.status       
            ,data.createdAt    
            ,data.updatedAt    )
    }

    toPrimitive() {
        return {
            id                : this.id
            ,userId           : this.userId.toString()
            ,userType           : this.userType   
            ,firebaseToken    : this.firebaseToken
            ,status           : this.status.toString()
            ,createdAt        : moment(this.createdAt).format("yyyy-MM-DD HH:mm:ss")
            ,updatedAt        : moment(this.updatedAt).format("yyyy-MM-DD HH:mm:ss")
        }
    }
}