export interface CreateTokenCommand {
    id: string;
    userId: string; 
    userTypeId: number;  
    firebaseToken: string;
    state: number;
    createdAt: Date;
}

export interface CreateTokenResult {
    userId: string;
    userTypeId: number;
    firebaseToken: string;
}

export interface UpdateTokenCommand {
    userId: string;
    userTypeId: number;
}