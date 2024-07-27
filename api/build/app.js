"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const port = process.env.PORT || 5000;
class App {
    constructor() {
        this.app = (0, express_1.default)();
    }
    startApp() {
        const server = new routes_1.default();
        server.start(Number(port));
    }
}
exports.default = App;
