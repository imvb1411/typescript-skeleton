export interface SendMessageCommand {
    messageType: number;
    deviceFromId: string;
    deviceFromType: number;
    destinationId: string;
    destinationType: number;
    data: string;
    forGroup: number;
    createdAt: string;
}

export interface SendMessageResult {
    id: string;
    deviceFromType: number;
    state: number;
    sentAt: string;
}

export interface ConfirmMessageCommand {
    id: string;
    destinationState: number;
    receivedAt: string;
}

export interface ConfirmMessageResult {
    id: string;
}