"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEntity = void 0;
const moment_1 = __importDefault(require("moment"));
class MessageEntity {
    constructor(id, messageTypeId, deviceFromId, destinationId, data, forGroup, status, createdAt, sendedAt) {
        this.id = id;
        this.messageTypeId = messageTypeId;
        this.deviceFromId = deviceFromId;
        this.destinationId = destinationId;
        this.data = data;
        this.forGroup = forGroup;
        this.status = status;
        this.createdAt = createdAt;
        this.sendedAt = sendedAt;
    }
    static fromPrimitive(data) {
        return new MessageEntity(data.id, data.messageTypeId, data.deviceFromId, data.destinationId, data.data, data.forGroup, data.status, data.createdAt, data.sendedAt);
    }
    toPrimitive() {
        return {
            id: this.id,
            messageTypeId: this.messageTypeId.toString(),
            deviceFromId: this.deviceFromId.toString(),
            destinationId: this.destinationId.toString(),
            data: this.data,
            forGroup: this.forGroup.toString(),
            status: this.status.toString(),
            createdAt: moment_1.default(this.createdAt).format("yyyy-MM-DD HH:mm:ss"),
            sendedAt: moment_1.default(this.sendedAt).format("yyyy-MM-DD HH:mm:ss")
        };
    }
}
exports.MessageEntity = MessageEntity;
//# sourceMappingURL=message-entity.js.map