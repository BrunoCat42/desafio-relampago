import { pool } from "../config/database";
import { Maintenance, NewMaintenance } from "../interfaces/Maintenance";

export async function createMaintenance(assetId: string, data: NewMaintenance): Promise<Maintenance> {
  const query = `
    INSERT INTO maintenances (asset_id, maintenance, description, performed_at, next_due_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    assetId,
    data.maintenance,
    data.description,
    data.performed_at,
    data.next_due_date,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function getMaintenancesById(assetId: string): Promise<Maintenance[]> {
  const result = await pool.query(
    `SELECT * FROM maintenances WHERE asset_id = $1 ORDER BY performed_at DESC;`,
    [assetId]
  );
  return result.rows;
}

export async function updateMaintenance(
  maintenanceId: string,
  data: Partial<NewMaintenance>
): Promise<Maintenance | null> {
  const fields = [];
  const values = [];
  let i = 1;

  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = $${i}`);
    values.push(value);
    i++;
  }

  if (fields.length === 0) return null;

  const query = `
    UPDATE maintenances
    SET ${fields.join(", ")}
    WHERE id = $${i}
    RETURNING *;
  `;

  values.push(maintenanceId);
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

export async function removeMaintenance(maintenanceId: string): Promise<void> {
  await pool.query(`DELETE FROM maintenances WHERE id = $1`, [maintenanceId]);
}

export async function findAllMaintenances() {
  const result = await pool.query("SELECT * FROM maintenances");
  return result.rows;
}

export async function findAllMaintenances() {
  const result = await pool.query("SELECT * FROM maintenances");
  return result.rows;
}
