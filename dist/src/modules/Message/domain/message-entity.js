"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEntity = void 0;
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
            createdAt: this.createdAt.toString(),
            sendedAt: this.sendedAt.toString()
        };
    }
}
exports.MessageEntity = MessageEntity;
//# sourceMappingURL=message-entity.js.map