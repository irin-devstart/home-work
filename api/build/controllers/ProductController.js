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
exports.ProductController = void 0;
const core_1 = require("@overnightjs/core");
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../services");
let ProductController = class ProductController {
    async getAll(req, res, next) {
        try {
            const order = await services_1.ProductService.getAllProducts(req.query);
            return res.status(http_status_codes_1.StatusCodes.OK).json(order);
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const order = await services_1.ProductService.getOneProduct(+id);
            return res.status(http_status_codes_1.StatusCodes.OK).json(order);
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }
    async create(req, res, next) {
        try {
            const order = await services_1.ProductService.createProduct(req.body);
            return res.status(http_status_codes_1.StatusCodes.OK).json(order);
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const order = await services_1.ProductService.editProduct(+id, req.body);
            return res.status(http_status_codes_1.StatusCodes.OK).json(order);
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await services_1.ProductService.deleteProduct(+id);
            return res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, core_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAll", null);
__decorate([
    (0, core_1.Get)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getOne", null);
__decorate([
    (0, core_1.Post)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, core_1.Put)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, core_1.Delete)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
exports.ProductController = ProductController = __decorate([
    (0, core_1.Controller)('api/product')
    // @ClassMiddleware(Authentication.AUTHENTICATED)
    // @ClassErrorMiddleware(globalErrorHandler)
], ProductController);
