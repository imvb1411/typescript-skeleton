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
}
exports.MessageEntity = MessageEntity;
//# sourceMappingURL=message-entity.js.map