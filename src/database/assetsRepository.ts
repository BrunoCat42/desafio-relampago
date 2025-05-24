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
