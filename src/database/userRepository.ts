import { pool } from "../config/database";

export async function insertUser(
  name: string,
  email: string,
  passwordHash: string
) {
  const result = await pool.query(
    "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, passwordHash]
  );

  return result.rows[0];
}
