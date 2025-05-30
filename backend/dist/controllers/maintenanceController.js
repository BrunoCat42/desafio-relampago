"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMaintenance = postMaintenance;
exports.getAllMaintenances = getAllMaintenances;
exports.deleteMaintenanceById = deleteMaintenanceById;
exports.patchMaintenanceById = patchMaintenanceById;
const maintenanceService_1 = require("../services/maintenanceService");
async function postMaintenance(req, res) {
    const { assetId, maintenance, description, performed_at, next_due_date } = req.body;
    if (!assetId || !maintenance || !description || !performed_at) {
        res.status(400).json({ error: "One or more fields are required" });
        return;
    }
    const record = await (0, maintenanceService_1.addMaintenance)(assetId, {
        maintenance,
        description,
        performed_at,
        next_due_date,
    });
    res.status(201).json(record);
}
async function getAllMaintenances(req, res) {
    const assetId = req.body.assetId;
    if (!assetId) {
        res.status(400).json({ error: "Asset ID is required" });
        return;
    }
    const list = await (0, maintenanceService_1.listMaintenances)(assetId);
    res.status(200).json(list);
}
async function deleteMaintenanceById(req, res) {
    const { maintenanceId } = req.params;
    if (!maintenanceId) {
        res.status(400).json({ error: "Maintenance ID is required" });
        return;
    }
    await (0, maintenanceService_1.deleteMaintenance)(maintenanceId);
    res.status(204).send();
}
async function patchMaintenanceById(req, res) {
    const { maintenanceId } = req.params;
    const updateData = req.body;
    if (!maintenanceId) {
        res.status(400).json({ error: "Maintenance ID is required" });
        return;
    }
    const updated = await (0, maintenanceService_1.modifyMaintenance)(maintenanceId, updateData);
    if (!updated) {
        res.status(404).json({ error: "Maintenance not found" });
        return;
    }
    res.status(200).json(updated);
}
