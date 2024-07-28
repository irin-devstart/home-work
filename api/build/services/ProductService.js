"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.createProduct = exports.editProduct = exports.getOneProduct = exports.getAllProducts = void 0;
const models_1 = require("../databases/models");
const getAllProducts = async (params) => {
    const product = await models_1.ProductModel.getAll(params);
    return product;
};
exports.getAllProducts = getAllProducts;
const getOneProduct = async (id) => {
    const product = await models_1.ProductModel.getOne(id);
    return product;
};
exports.getOneProduct = getOneProduct;
const editProduct = async (id, data) => {
    const product = await models_1.ProductModel.edit(id, data);
    return product;
};
exports.editProduct = editProduct;
const createProduct = async (data) => {
    const product = await models_1.ProductModel.create(data);
    return product;
};
exports.createProduct = createProduct;
const deleteProduct = async (id) => {
    const product = await models_1.ProductModel.edit(id, { isDeleted: true });
    return product;
};
exports.deleteProduct = deleteProduct;
