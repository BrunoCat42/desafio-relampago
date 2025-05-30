"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const database_1 = require("../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function login({ email, password }) {
    const result = await database_1.pool.query("SELECT id, name, email, password_hash FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user) {
        throw new Error("Invalid credentials.");
    }
    const passwordMatches = await bcrypt_1.default.compare(password, user.password_hash);
    if (!passwordMatches) {
        throw new Error("Invalid credentials.");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
        },
    };
}
