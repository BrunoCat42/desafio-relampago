"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = require("../database/userRepository");
async function createUser({ name, email, password }) {
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    return await (0, userRepository_1.insertUser)(name, email, passwordHash);
}
