import { MessageEntity, MessageType } from "../../../domain/message-entity";
import IMessaging from "../../../../../shared/infrastructure/messaging/IMessaging";
import admin from 'firebase-admin';
import { ServiceAccount } from "./service-account";
import moment from "moment";

export default class FirebaseMessaging implements IMessaging {

    static instance: FirebaseMessaging;

    constructor() {
        var serviceAccount: ServiceAccount = require("./firebaseAccountKey.json");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }

    static connect(): FirebaseMessaging {
        if (this.instance == null) {
            this.instance = new FirebaseMessaging();
        }
        return this.instance;
    }

    async sendMessageToDevice(messageEntity: MessageEntity, token: string, notificationBody: string): Promise<MessageEntity> {
        var payload = {
            data               : {
                id                 : messageEntity.id
                ,messageType     : messageEntity.messageType.toString()
                ,deviceFromId      : messageEntity.deviceFromId.toString()
                ,deviceFromType    : messageEntity.deviceFromType.toString()
                ,destinationId     : messageEntity.destinationId.toString()
                ,destinationType : messageEntity.destinationType.toString()
                ,data              : messageEntity.data
                ,groupId          : messageEntity.groupId
                ,groupType        : messageEntity.groupType.toString()
                ,destinationState : messageEntity.destinationState.toString()
                ,state            : messageEntity.state.toString()
                ,createdAt         : moment(messageEntity.createdAt).format("yyyy-MM-DD HH:mm:ss")
                ,sentAt          : moment(messageEntity.sentAt).format("yyyy-MM-DD HH:mm:ss")
                ,notificationBody  : notificationBody == null?"" + messageEntity.data: notificationBody
                ,multimedia        : messageEntity.messageType != MessageType.Text ? JSON.stringify(messageEntity.multimedia):""
            }              
        };
        var options = {
            priority: "high"
        };
        
        const result = await admin
                        .messaging()
                        .sendToDevice(token, payload, options);
        return messageEntity;
    }

    sendMessageToGroup(): Promise<MessageEntity[]> {
        throw new Error("Method not implemented.");
    }

}