"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
var Levels;
(function (Levels) {
    Levels["DEBUG"] = "debug";
    Levels["ERROR"] = "error";
    Levels["INFO"] = "info";
})(Levels || (Levels = {}));
class WinstonLogger {
    constructor() {
        this.logger = winston_1.default.createLogger({
            format: winston_1.default.format.combine(winston_1.default.format.prettyPrint(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.colorize(), winston_1.default.format.simple()),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({ filename: `logs/${Levels.DEBUG}.log`, level: Levels.DEBUG }),
                new winston_1.default.transports.File({ filename: `logs/${Levels.ERROR}.log`, level: Levels.ERROR }),
                new winston_1.default.transports.File({ filename: `logs/${Levels.INFO}.log`, level: Levels.INFO })
            ]
        });
    }
    debug(message) {
        this.logger.debug(message);
    }
    error(message) {
        this.logger.error(message);
    }
    info(message) {
        this.logger.info(message);
    }
}
exports.default = WinstonLogger;
//# sourceMappingURL=winston-logger.js.map