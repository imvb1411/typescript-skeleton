"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const glob_1 = __importDefault(require("glob"));
function registerRoutes(router) {
    const routes = glob_1.default.sync(__dirname + '/contact.route.js');
    routes.map(route => register(route, router));
}
exports.registerRoutes = registerRoutes;
function register(routePath, app) {
    const route = require(routePath);
    route.register(app);
}
//# sourceMappingURL=index.js.map