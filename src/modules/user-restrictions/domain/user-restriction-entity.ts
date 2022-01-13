import { UserType } from "./../../user-tokens/domain/user-token-entity";

export class UserRestrictionEntity {
    id            : string;
    userRestricted: string;
    restrictionType: RestrictionType;
    userId        : string;
    userType      : UserType;
    state         : number;
    createdAt     : Date;
    updatedAt : Date;
}

export enum RestrictionType {
    Mute = 1,
    SendImages = 2,
    SendVideos = 3,
    SendDocuments = 4,
    SendAudio = 5
}