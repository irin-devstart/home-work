"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const controllers = __importStar(require("./controllers"));
class RouterServer extends core_1.Server {
    constructor() {
        super(true);
        this.configureMiddlewares();
        this.setupControllers();
    }
    setupControllers() {
        const controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            // eslint-disable-next-line
            const controller = controllers[name];
            if (typeof controller === 'function') {
                controllerInstances.push(new controller());
            }
        }
        super.addControllers(controllerInstances);
    }
    async configureMiddlewares() {
        // NOTE for dev
        // const corsOption = {
        //   origin: process.env.CORS_WHITELIST_ORIGIN,
        //   allowMethods: process.env.CORS_WHITELIST_ALLOW_METHODS,
        //   allowHeaders: process.env.CORS_WHITELIST_ALLOW_HEADERS
        // };
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
    }
    start(port) {
        this.app.listen(port, () => {
            console.log(`Apps is initialised port ${port}`);
        });
    }
}
exports.default = RouterServer;
