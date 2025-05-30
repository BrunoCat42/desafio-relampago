"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = insertUser;
const database_1 = require("../config/database");
async function insertUser(name, email, passwordHash) {
    const result = await database_1.pool.query("INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email", [name, email, passwordHash]);
    return result.rows[0];
}
