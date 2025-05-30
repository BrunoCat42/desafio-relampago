"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMaintenance = addMaintenance;
exports.listMaintenances = listMaintenances;
exports.deleteMaintenance = deleteMaintenance;
exports.modifyMaintenance = modifyMaintenance;
const maintenanceRepository_1 = require("../database/maintenanceRepository");
async function addMaintenance(assetId, data) {
    return await (0, maintenanceRepository_1.createMaintenance)(assetId, data);
}
async function listMaintenances(assetId) {
    return await (0, maintenanceRepository_1.getMaintenances)(assetId);
}
async function deleteMaintenance(maintenanceId) {
    return await (0, maintenanceRepository_1.removeMaintenance)(maintenanceId);
}
async function modifyMaintenance(maintenanceId, data) {
    return await (0, maintenanceRepository_1.updateMaintenance)(maintenanceId, data);
}
