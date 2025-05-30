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
    const { id } = req.user;
    if (!name) {
        res.status(400).json({ error: "Name is required" });
        return;
    }
    const asset = await (0, assetsService_1.createAsset)({ name, description }, id);
    res.status(201).json(asset);
    return;
}
async function getAssets(req, res) {
    const { id } = req.user;
    const assets = await (0, assetsService_1.getAssetsByUser)(id);
    res.status(200).json(assets);
    return;
}
async function getAssetById(req, res) {
    const { id: assetId } = req.params;
    const { id } = req.user;
    const asset = await (0, assetsService_1.getAsset)(assetId, id);
    if (!asset) {
        res.status(404).json({ error: "Asset not found" });
        return;
    }
    res.status(200).json(asset);
    return;
}
async function patchAsset(req, res) {
    const { id: assetId } = req.params;
    const { name, description } = req.body;
    const { id } = req.user;
    const asset = await (0, assetsService_1.editAsset)(assetId, id, name, description);
    if (!asset) {
        res.status(404).json({ error: "Asset not found or not yours" });
        return;
    }
    res.status(200).json(asset);
    return;
}
async function deleteAssetById(req, res) {
    const { id: assetId } = req.params;
    const { id } = req.user;
    await (0, assetsService_1.removeAsset)(assetId, id);
    res.status(204).send();
    return;
}
