"use strict";
//CORRIGIR (req as any), e entender o que está acontecendo
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAsset = postAsset;
exports.getAssets = getAssets;
exports.getAssetById = getAssetById;
exports.patchAsset = patchAsset;
exports.deleteAssetById = deleteAssetById;
const assetsService_1 = require("../services/assetsService");
async function postAsset(req, res) {
    const { name, description } = req.body;
    const { userId } = req.user;
    if (!name) {
        res.status(400).json({ error: "Name is required" });
        return;
    }
    const asset = await (0, assetsService_1.createAsset)({ name, description }, userId);
    res.status(201).json(asset);
    return;
}
async function getAssets(req, res) {
    const { userId } = req.user;
    const assets = await (0, assetsService_1.getAssetsByUser)(userId);
    res.status(200).json(assets);
    return;
}
async function getAssetById(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    const asset = await (0, assetsService_1.getAsset)(id, userId);
    if (!asset) {
        res.status(404).json({ error: "Asset not found" });
        return;
    }
    res.status(200).json(asset);
    return;
}
async function patchAsset(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    const { userId } = req.user;
    const asset = await (0, assetsService_1.editAsset)(id, userId, name, description);
    if (!asset) {
        res.status(404).json({ error: "Asset not found or not yours" });
        return;
    }
    res.status(200).json(asset);
    return;
}
async function deleteAssetById(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    await (0, assetsService_1.removeAsset)(id, userId);
    res.status(204).send();
    return;
}
