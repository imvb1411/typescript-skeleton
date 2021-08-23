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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const http_status_1 = __importDefault(require("http-status"));
const dependency_injection_1 = __importDefault(require("./dependency-injection"));
const routes_1 = require("./routes");
class Server {
    constructor(port) {
        this.port = port;
        this.logger = dependency_injection_1.default.get('shared.logger');
        this.app = express_1.default();
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(compression_1.default());
        const router = express_promise_router_1.default();
        this.app.use(router);
        routes_1.registerRoutes(router);
        router.use((err, req, res, next) => {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(err.message);
        });
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.httpServer = this.app.listen(this.port, () => {
                    this.logger.info(`Backend App is running at http://localhost:${this.port} in ${this.app.get('env')} mode`);
                    this.logger.info('  Press CTRL-C to stop\n');
                    resolve();
                });
            });
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.httpServer) {
                    this.httpServer.close(error => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve();
                    });
                }
                return resolve();
            });
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map