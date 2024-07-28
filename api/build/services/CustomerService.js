"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.createCustomer = exports.editCustomer = exports.getOneCustomer = exports.getAllCustomers = void 0;
const models_1 = require("../databases/models");
const getAllCustomers = async (params) => {
    const customer = await models_1.CustomerModel.getAll(params);
    return customer;
};
exports.getAllCustomers = getAllCustomers;
const getOneCustomer = async (id) => {
    const customer = await models_1.CustomerModel.getOne(id);
    return customer;
};
exports.getOneCustomer = getOneCustomer;
const editCustomer = async (id, data) => {
    const customer = await models_1.CustomerModel.edit(id, data);
    return customer;
};
exports.editCustomer = editCustomer;
const createCustomer = async (data) => {
    const customer = await models_1.CustomerModel.create(data);
    return customer;
};
exports.createCustomer = createCustomer;
const deleteCustomer = async (id) => {
    const customer = await models_1.CustomerModel.edit(id, { isDeleted: true });
    return customer;
};
exports.deleteCustomer = deleteCustomer;
