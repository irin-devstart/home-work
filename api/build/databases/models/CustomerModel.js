"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit = exports.create = exports.getOne = exports.getAll = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getAll = async (params) => {
    var _a, _b;
    const where = {
        isDeleted: false
    };
    const skip = (_a = +(params === null || params === void 0 ? void 0 : params.offset)) !== null && _a !== void 0 ? _a : undefined;
    const take = (_b = +(params === null || params === void 0 ? void 0 : params.limit)) !== null && _b !== void 0 ? _b : undefined;
    const countPromise = client_1.default.customer.count({ where });
    const rowsPromise = client_1.default.customer.findMany({
        skip,
        take,
        orderBy: [{ id: 'desc' }],
        where
    });
    const [count, rows] = await Promise.all([countPromise, rowsPromise]);
    return { count, rows };
};
exports.getAll = getAll;
const getOne = (id) => {
    return client_1.default.customer.findUnique({
        where: { id }
    });
};
exports.getOne = getOne;
const create = (data) => {
    return client_1.default.customer.create({ data });
};
exports.create = create;
const edit = async (id, data) => {
    return client_1.default.customer.update({
        where: { id },
        data
    });
};
exports.edit = edit;
