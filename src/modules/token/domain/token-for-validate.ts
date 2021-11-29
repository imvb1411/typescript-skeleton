export class TokenForValidate {
    readonly userId: string;
    readonly firebaseToken: string;

    constructor(userId: string, firebaseToken: string) {
        this.userId = userId;
        this.firebaseToken = firebaseToken;
    }
}