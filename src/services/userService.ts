import bcrypt from "bcrypt";
import { insertUser } from "../database/userRepository";
import { NewUser } from "../interfaces/User";

export async function createUser({ name, email, password }: NewUser) {
  const passwordHash = await bcrypt.hash(password, 10);
  return await insertUser(name, email, passwordHash);
}
