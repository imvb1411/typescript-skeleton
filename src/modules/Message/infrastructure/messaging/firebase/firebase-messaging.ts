import { MessageEntity } from "./../../../domain/message-entity";
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
                ,messageTypeId     : messageEntity.messageTypeId.toString()
                ,deviceFromId      : messageEntity.deviceFromId.toString()
                ,destinationId     : messageEntity.destinationId.toString()
                ,data              : messageEntity.data
                ,forGroup          : messageEntity.forGroup.toString()
                ,destinationStatus : messageEntity.destinationStatus.toString()
                ,status            : messageEntity.status.toString()
                ,createdAt         : moment(messageEntity.createdAt).format("yyyy-MM-DD HH:mm:ss")
                ,sendedAt          : moment(messageEntity.sendedAt).format("yyyy-MM-DD HH:mm:ss")
                //,receivedAt        : messageEntity.receivedAt == null?"": moment(messageEntity.receivedAt).format("yyyy-MM-DD HH:mm:ss")
                ,notificationBody  : notificationBody
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