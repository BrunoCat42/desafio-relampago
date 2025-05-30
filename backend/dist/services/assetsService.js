"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsset = createAsset;
exports.getAssetsByUser = getAssetsByUser;
exports.getAsset = getAsset;
exports.editAsset = editAsset;
exports.removeAsset = removeAsset;
const assetsRepository_1 = require("../database/assetsRepository");
async function createAsset(asset, userId) {
    return await (0, assetsRepository_1.insertAsset)(asset.name, asset.description, userId);
}
async function getAssetsByUser(userId) {
    return await (0, assetsRepository_1.listUserAssets)(userId);
}
async function getAsset(id, userId) {
    return await (0, assetsRepository_1.getAssetById)(id, userId);
}
async function editAsset(id, userId, name, description) {
    return await (0, assetsRepository_1.updateAsset)(id, userId, name, description);
}
async function removeAsset(id, userId) {
    return await (0, assetsRepository_1.deleteAsset)(id, userId);
}
