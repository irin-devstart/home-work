"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.createOrder = exports.editOrder = exports.getOneOrder = exports.getAllOrders = void 0;
const models_1 = require("../databases/models");
const getAllOrders = async (params) => {
    const order = await models_1.OrderModel.getAll(params);
    return order;
};
exports.getAllOrders = getAllOrders;
const getOneOrder = async (id) => {
    const order = await models_1.OrderModel.getOne(id);
    return order;
};
exports.getOneOrder = getOneOrder;
const editOrder = async (id, data) => {
    const order = await models_1.OrderModel.edit(id, data);
    return order;
};
exports.editOrder = editOrder;
const createOrder = async (data) => {
    const order = await models_1.OrderModel.create(data);
    return order;
};
exports.createOrder = createOrder;
const deleteOrder = async (id) => {
    const order = await models_1.OrderModel.edit(id, { isDeleted: true });
    return order;
};
exports.deleteOrder = deleteOrder;
