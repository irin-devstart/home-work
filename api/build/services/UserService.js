"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = exports.editUser = exports.getOneUser = exports.getAllUsers = void 0;
const models_1 = require("../databases/models");
const getAllUsers = async (params) => {
    const user = await models_1.UserModel.getAll(params);
    return user;
};
exports.getAllUsers = getAllUsers;
const getOneUser = async (id) => {
    const user = await models_1.UserModel.getById(id);
    return user;
};
exports.getOneUser = getOneUser;
const editUser = async (id, data) => {
    const user = await models_1.UserModel.edit(id, data);
    return user;
};
exports.editUser = editUser;
const createUser = async (data) => {
    const user = await models_1.UserModel.create(data);
    return user;
};
exports.createUser = createUser;
const deleteUser = async (id) => {
    const user = await models_1.UserModel.edit(id, { isDeleted: true });
    return user;
};
exports.deleteUser = deleteUser;
