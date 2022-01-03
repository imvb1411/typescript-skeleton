import { MessageEntity, MessageType } from "./../../../domain/message-entity";
import IMessaging from "./../../../../../shared/infrastructure/messaging/IMessaging";
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
            // notification : {
            //     title : messageEntity.deviceFromId.toString(),
            //     body : messageEntity.data
            // },
            data               : {
                id                 : messageEntity.id
                ,messageType     : messageEntity.messageType.toString()
                ,deviceFromId      : messageEntity.deviceFromId.toString()
                ,deviceFromType    : messageEntity.deviceFromType.toString()
                ,destinationId     : messageEntity.destinationId.toString()
                ,destinationType : messageEntity.destinationType.toString()
                ,data              : messageEntity.data
                ,forGroup          : messageEntity.forGroup.toString()
                ,destinationState : messageEntity.destinationState.toString()
                ,state            : messageEntity.state.toString()
                ,createdAt         : moment(messageEntity.createdAt).format("yyyy-MM-DD HH:mm:ss")
                ,sentAt          : moment(messageEntity.sentAt).format("yyyy-MM-DD HH:mm:ss")
                //,receivedAt        : messageEntity.receivedAt == null?"": moment(messageEntity.receivedAt).format("yyyy-MM-DD HH:mm:ss")
                ,notificationBody  : notificationBody == null?"" + messageEntity.data: notificationBody
                ,multimedia        : messageEntity.messageType != MessageType.Text ? JSON.stringify(messageEntity.multimedia):""
            }              
        };
        console.log(payload);
        var options = {
            priority: "high"
        };
        
        const result = await admin
                        .messaging()
                        .sendToDevice(token, payload, options);
        console.log(result.results[0].error);
        return messageEntity;
    }

    sendMessageToGroup(): Promise<MessageEntity[]> {
        throw new Error("Method not implemented.");
    }

}