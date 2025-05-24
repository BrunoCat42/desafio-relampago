import { Request, Response } from "express";
import { login } from "../services/loginService";
import { LoginData } from "../interfaces/Login";

export async function loginUser(
  req: Request<LoginData>,
  res: Response
): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return
  }

  try {
    const token = await login({ email, password });
    res.status(200).json({ token });
    return

  } catch (err: any) {
    res.status(401).json({ error: err.message });
    return
  }
}
