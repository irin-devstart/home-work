"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getAll = async () => {
    const where = {
        isDeleted: false
    };
    const count = await client_1.default.product.count({ where });
    const rows = await client_1.default.product.findMany({
        orderBy: [{ id: 'desc' }],
        where
    });
    return { count, rows };
};
exports.getAll = getAll;
const getOne = () => { };
exports.getOne = getOne;
const create = () => { };
exports.create = create;
const update = () => { };
exports.update = update;
