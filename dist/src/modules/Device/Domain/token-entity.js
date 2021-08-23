"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenEntity = void 0;
class TokenEntity {
    constructor(id, userId, firebaseToken, status, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.firebaseToken = firebaseToken;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.TokenEntity = TokenEntity;
//# sourceMappingURL=token-entity.js.map