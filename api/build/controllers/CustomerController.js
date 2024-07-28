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
exports.CustomerController = void 0;
const core_1 = require("@overnightjs/core");
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../services");
let CustomerController = class CustomerController {
    async getAll(req, res, next) {
        try {
            const customer = await services_1.CustomerService.getAllCustomers(req.query);
            return res.status(http_status_codes_1.StatusCodes.OK).json(customer);
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const customer = await services_1.CustomerService.getOneCustomer(+id);
            return res.status(http_status_codes_1.StatusCodes.OK).json(customer);
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }
    async create(req, res, next) {
        try {
            const customer = await services_1.CustomerService.createCustomer(req.body);
            return res.status(http_status_codes_1.StatusCodes.OK).json(customer);
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }
    async update(req, res, next) {
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
exports.CustomerController = CustomerController;
__decorate([
    (0, core_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getAll", null);
__decorate([
    (0, core_1.Get)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getOne", null);
__decorate([
    (0, core_1.Post)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "create", null);
__decorate([
    (0, core_1.Put)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "update", null);
__decorate([
    (0, core_1.Delete)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "delete", null);
exports.CustomerController = CustomerController = __decorate([
    (0, core_1.Controller)('api/customer')
    // @ClassMiddleware(Authentication.AUTHENTICATED)
    // @ClassErrorMiddleware(globalErrorHandler)
], CustomerController);
