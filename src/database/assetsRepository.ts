import { pool } from "../config/database";

export async function insertAsset(name: string, description: string | undefined, userId: string) {
  const result = await pool.query(
    "INSERT INTO assets (name, description, user_id) VALUES ($1, $2, $3) RETURNING *",
    [name, description, userId]
  );

  return result.rows[0];
}

export async function listUserAssets(userId: string) {
  const result = await pool.query(
    "SELECT * FROM assets WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );

  return result.rows;
}

export async function getAssetById(id: string, userId: string) {
  const result = await pool.query(
    "SELECT * FROM assets WHERE id = $1 AND user_id = $2",
    [id, userId]
  );
  return result.rows[0];
}

export async function updateAsset(id: string, userId: string, name?: string, description?: string) {
  const result = await pool.query(
    `UPDATE assets
     SET name = COALESCE($1, name),
         description = COALESCE($2, description)
     WHERE id = $3 AND user_id = $4
     RETURNING *`,
    [name, description, id, userId]
  );
  return result.rows[0];
}

export async function deleteAsset(id: string, userId: string) {
  await pool.query("DELETE FROM assets WHERE id = $1 AND user_id = $2", [id, userId]);
}