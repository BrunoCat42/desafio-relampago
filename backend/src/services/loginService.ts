import { pool } from "../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginData } from "../interfaces/Login";

export async function login({ email, password }: LoginData): Promise<{
  token: string;
  user: { id: string; email: string, name: string};
}> {
  const result = await pool.query(
    "SELECT id, name, email, password_hash FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid credentials.");
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    throw new Error("Invalid credentials.");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    },
  };
}
