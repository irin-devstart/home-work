"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
const argon2_1 = __importDefault(require("argon2"));
const client_1 = __importDefault(require("../prisma/client"));
const userData = {
    name: 'admin',
    email: 'admin@gmail.com',
    role: 'ADMIN',
    password: '123456',
    isActive: true
};
async function main() {
    console.log('Start seeding ...');
    const password = await argon2_1.default.hash(userData.password);
    const data = {
        ...userData,
        password
    };
    const user = await client_1.default.user.create({ data });
    console.log(`Created user with id: ${user.id}`);
}
console.log('Seeding finished.');
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await client_1.default.$disconnect();
});
