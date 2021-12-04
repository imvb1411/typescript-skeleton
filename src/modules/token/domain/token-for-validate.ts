export class TokenForValidate {
    readonly userId: string;
    readonly userType: number;
    readonly firebaseToken: string;

    constructor(userId: string, userType: number, firebaseToken: string) {
        this.userId = userId;
        this.userType = userType;
        this.firebaseToken = firebaseToken;
    }
}