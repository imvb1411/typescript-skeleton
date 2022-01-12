export interface CreateUserRestrictionCommand {
    userRestricted: string;
    restrictionType: number;
    userId: string;
    userType: number;
    state: number;
}

export interface CreateUserRestrictionResult {
    id: string;
    createdAt: string;
}

export interface DeleteUserRestrictionCommand {
    id: string;
    state: number;
}

export interface DeleteUserRestrictionResult {
    id: string;
    updatedAt: string;
}