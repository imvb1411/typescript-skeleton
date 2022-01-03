export interface SendMessageCommand {
    messageType: number;
    deviceFromId: string;
    deviceFromType: number;
    destinationId: string;
    destinationType: number;
    data: string;
    forGroup: number;
    createdAt: string;
    multimedia: SendMultimediaCommand;
}

export interface SendMessageResult {
    id: string;
    messageType: number;
    deviceFromType: number;
    state: number;
    sentAt: string;
    multimedia: SendMultimediaCommand;
}

export interface ConfirmMessageCommand {
    id: string;
    destinationState: number;
    receivedAt: string;
}

export interface ConfirmMessageResult {
    id: string;
}

export interface SendMultimediaCommand {
    id: string;
    firebaseUri: string;
}