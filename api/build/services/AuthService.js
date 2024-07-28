"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserCredentials = exports.generateUserJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = __importDefault(require("argon2"));
const models_1 = require("../databases/models");
const generateUserJwt = (userId, jwtid) => {
    const body = { id: userId };
    return jsonwebtoken_1.default.sign(body, process.env.APP_SECRET, { jwtid });
};
exports.generateUserJwt = generateUserJwt;
const verifyUserCredentials = async (email, password) => {
    const user = await models_1.UserModel.getByEmail(email);
    const verifyUser = await argon2_1.default.verify(user.password, password);
    if (!verifyUser)
        throw new Error();
    return user;
};
exports.verifyUserCredentials = verifyUserCredentials;
