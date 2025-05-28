import { pool } from "../config/database";

export async function insertMaintenance(
  assetId: string,
  maintenance: string,
  description: string,
  performedAt: string,
  nextDueDate?: string
) {
  const result = await pool.query(
    `INSERT INTO maintenances (asset_id, maintenance, description, performed_at, next_due_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [assetId, maintenance, description, performedAt, nextDueDate]
  );
  return result.rows[0];
}

export async function listMaintenancesForAsset(assetId: string) {
  const result = await pool.query(
    `SELECT * FROM maintenances WHERE asset_id = $1 ORDER BY performed_at DESC`,
    [assetId]
  );
  return result.rows;
}

export async function deleteMaintenance(id: string, assetId: string) {
  await pool.query(`DELETE FROM maintenances WHERE id = $1 AND asset_id = $2`, [
    id,
    assetId,
  ]);
}
