"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const core_1 = require("@overnightjs/core");
const http_status_codes_1 = require("http-status-codes");
const uuid_1 = require("uuid");
const services_1 = require("../services");
let AuthController = class AuthController {
    async login(req, res, next) {
        try {
            const jwtid = (0, uuid_1.v4)();
            const { email, password } = req.body;
            const user = await services_1.AuthService.verifyUserCredentials(email, password);
            delete user.password;
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                token: services_1.AuthService.generateUserJwt(user.id, jwtid),
                user
            });
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const { id } = req.params;
            const customer = await services_1.CustomerService.editCustomer(+id, req.body);
            return res.status(http_status_codes_1.StatusCodes.OK).json(customer);
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await services_1.CustomerService.deleteCustomer(+id);
            return res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, core_1.Post)('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, core_1.Post)('logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, core_1.Delete)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "delete", null);
exports.AuthController = AuthController = __decorate([
    (0, core_1.Controller)('api/')
    // @ClassMiddleware(Authentication.AUTHENTICATED)
    // @ClassErrorMiddleware(globalErrorHandler)
], AuthController);
