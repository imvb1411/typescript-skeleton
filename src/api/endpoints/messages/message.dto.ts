export interface SendMessageCommand {
    messageType: number;
    deviceFromId: string;
    destinationId: string;
    destinationUserType: number;
    data: string;
    forGroup: number;
    createdAt: string;
}

export interface SendMessageResult {
    id: string;
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