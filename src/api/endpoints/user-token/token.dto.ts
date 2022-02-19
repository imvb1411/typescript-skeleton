export interface CreateTokenCommand {
    userId: string; 
    userType: number;  
    firebaseToken: string;
}

export interface CreateTokenResult {
    id : string;
    userId: string;
    userType: number;
    firebaseToken: string;
}

export interface CreateTokenWithNameResult {
    id : string;
    userId: string;
    userType: number;
    name: string;
    firebaseToken: string;
}

export interface DeleteTokenCommand {
    userId: string; 
    userType: number;  
    firebaseToken: string;
}