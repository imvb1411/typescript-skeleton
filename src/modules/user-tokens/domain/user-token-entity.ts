export class UserTokenEntity {
    id            : string;
    userId        : string;
    userType      : UserType;
    firebaseToken : string;
    state         : number;
    createdAt     : Date;
    updatedAt     : Date;
}

export enum UserType {
    Tutor = 1,
    Student = 2,
    Teacher = 3,
    Director = 4,
    Staff = 5
}