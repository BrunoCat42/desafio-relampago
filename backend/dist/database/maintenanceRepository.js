"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMaintenance = createMaintenance;
exports.getMaintenancesById = getMaintenancesById;
exports.updateMaintenance = updateMaintenance;
exports.removeMaintenance = removeMaintenance;
exports.findAllMaintenances = findAllMaintenances;
const database_1 = require("../config/database");
async function createMaintenance(assetId, data) {
    const query = `
    INSERT INTO maintenances (asset_id, maintenance, description, performed_at, next_due_date,completed)
    VALUES ($1, $2, $3, $4, $5,$6)
    RETURNING *;
  `;
    const values = [
        assetId,
        data.maintenance,
        data.description,
        data.performed_at,
        data.next_due_date,
        data.completed ?? false
    ];
    const result = await database_1.pool.query(query, values);
    return result.rows[0];
}
async function getMaintenancesById(assetId) {
    const result = await database_1.pool.query(`SELECT * FROM maintenances WHERE asset_id = $1 ORDER BY performed_at DESC;`, [assetId]);
    return result.rows;
}
async function updateMaintenance(maintenanceId, data) {
    const fields = [];
    const values = [];
    let i = 1;
    for (const [key, value] of Object.entries(data)) {
        fields.push(`${key} = $${i}`);
        values.push(value);
        i++;
    }
    if (fields.length === 0)
        return null;
    const query = `
    UPDATE maintenances
    SET ${fields.join(", ")}
    WHERE id = $${i}
    RETURNING *;
  `;
    values.push(maintenanceId);
    const result = await database_1.pool.query(query, values);
    return result.rows[0] || null;
}
async function removeMaintenance(maintenanceId) {
    await database_1.pool.query(`DELETE FROM maintenances WHERE id = $1`, [maintenanceId]);
}
async function findAllMaintenances() {
    const result = await database_1.pool.query("SELECT * FROM maintenances");
    return result.rows;
}
