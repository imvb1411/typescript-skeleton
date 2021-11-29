"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEntity = void 0;
const moment_1 = __importDefault(require("moment"));
class MessageEntity {
    constructor(id, messageTypeId, deviceFromId, destinationId, data, forGroup, destinationStatus, status, createdAt, sendedAt, receivedAt) {
        this.id = id;
        this.messageTypeId = messageTypeId;
        this.deviceFromId = deviceFromId;
        this.destinationId = destinationId;
        this.data = data;
        this.forGroup = forGroup;
        this.destinationStatus = destinationStatus;
        this.status = status;
        this.createdAt = createdAt;
        this.sendedAt = sendedAt;
        this.receivedAt = receivedAt;
    }
    static fromPrimitive(data) {
        return new MessageEntity("", data.messageTypeId, data.deviceFromId, data.destinationId, data.data, data.forGroup, data.destinationStatus, data.status, data.createdAt, data.sendedAt, data.receivedAt);
    }
    toPrimitive() {
        return {
            id: this.id,
            messageTypeId: this.messageTypeId.toString(),
            deviceFromId: this.deviceFromId.toString(),
            destinationId: this.destinationId.toString(),
            data: this.data,
            forGroup: this.forGroup.toString(),
            destinationStatus: this.destinationStatus.toString(),
            status: this.status.toString(),
            createdAt: moment_1.default(this.createdAt).format("yyyy-MM-DD HH:mm:ss"),
            sendedAt: moment_1.default(this.sendedAt).format("yyyy-MM-DD HH:mm:ss"),
            receivedAt: moment_1.default(this.receivedAt).format("yyyy-MM-DD HH:mm:ss")
        };
    }
}
exports.MessageEntity = MessageEntity;
//# sourceMappingURL=message-entity.js.map