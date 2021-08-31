import { ServiceAccount } from "./../../../config/service-account";
import { MessageEntity } from "./../domain/message-entity";
import admin from 'firebase-admin';

export default class FirebaseMessageSender {
    
    static instance: FirebaseMessageSender;

    constructor() {
        const serviceAccount: ServiceAccount = require("./../../../config/firebaseAccountKey.json");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }

    static getInstance(): FirebaseMessageSender {
        if (this.instance == null) {
            this.instance = new FirebaseMessageSender();
        }
        return this.instance;
    }

    async sendMessage(message: MessageEntity, token: string): Promise<MessageEntity> {

        var payload = {
            notification : {
                title : message.deviceFromId.toString(),
                body : message.data
            },
            data : message.toPrimitive()              
        };

        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };
        
        const result = await admin
                        .messaging()
                        .sendToDevice(token, payload, options);

        //message.id = result.results[0].messageId;
        //console.log(result.results[0]);
        return message;
    }
    
    
}