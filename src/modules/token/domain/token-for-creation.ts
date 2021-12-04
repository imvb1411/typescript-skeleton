export class TokenForCreation {
    id: string;
    userId: string;
    firebaseToken: string;
    status: number;
    createdAt: Date;

    constructor() {}
    // constructor(id: string, userId: number, firebaseToken: string, status: number, createdAt: Date){
    //     this.id = id;
    //     this.userId = userId;
    //     this.firebaseToken = firebaseToken;
    //     this.status= status;
    //     this.createdAt = createdAt;
    // }
}