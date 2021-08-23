"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const server_1 = require("./server");
class App {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const port = process.env.PORT || '3000';
            this.server = new server_1.Server(port);
            return this.server.listen();
        });
    }
    stop() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.server) === null || _a === void 0 ? void 0 : _a.stop());
        });
    }
    get port() {
        if (!this.server) {
            throw new Error('Backend application has not been started');
        }
        return this.server.port;
    }
    get httpServer() {
        var _a;
        return (_a = this.server) === null || _a === void 0 ? void 0 : _a.httpServer;
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map