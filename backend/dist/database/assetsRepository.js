"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertAsset = insertAsset;
exports.listUserAssets = listUserAssets;
exports.getAssetById = getAssetById;
exports.updateAsset = updateAsset;
exports.deleteAsset = deleteAsset;
const database_1 = require("../config/database");
async function insertAsset(name, description, userId) {
    const result = await database_1.pool.query("INSERT INTO assets (name, description, user_id) VALUES ($1, $2, $3) RETURNING *", [name, description, userId]);
    return result.rows[0];
}
async function listUserAssets(userId) {
    const result = await database_1.pool.query("SELECT * FROM assets WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
    return result.rows;
}
async function getAssetById(id, userId) {
    const result = await database_1.pool.query("SELECT * FROM assets WHERE id = $1 AND user_id = $2", [id, userId]);
    return result.rows[0];
}
async function updateAsset(id, userId, name, description) {
    const result = await database_1.pool.query(`UPDATE assets
     SET name = COALESCE($1, name),
         description = COALESCE($2, description)
     WHERE id = $3 AND user_id = $4
     RETURNING *`, [name, description, id, userId]);
    return result.rows[0];
}
async function deleteAsset(id, userId) {
    await database_1.pool.query("DELETE FROM assets WHERE id = $1 AND user_id = $2", [id, userId]);
}
