import { MultimediaEntity } from "./multimedia-entity";

export class MessageEntity {

    id                     : string;
    readonly messageType   : MessageType;
    readonly deviceFromId  : number;
    deviceFromType : number;
    destinationId : string;
    destinationType : number;
    data                   : string;
    readonly forGroup      : number;
    destinationState       : MessageDestinationState;
    state                  : MessageState;
    createdAt              : Date;
    sentAt               : Date;
    receivedAt             : Date;
    multimedia               : MultimediaEntity;
    constructor() {}
}

export enum MessageType {
    Text = 1,
    TextWithImage = 2,
    TextWithVideo = 3,
    Audio = 4,
    Document = 5
}

export enum MessageState {
    Create = 0,
    Send = 1,
    Error = 2
}

export enum MessageDestinationState {
    Create = 0,
    Sent = 1,
    Received = 2,
    Read = 3
}