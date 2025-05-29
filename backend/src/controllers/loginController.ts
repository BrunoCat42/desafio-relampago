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
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000
    }).json({succes: true})
    return

  } catch (err: any) {
    res.status(401).json({ error: err.message });
    return
  }
}

export function checkLogin(req: Request, res: Response) {
  res.status(200).json({
    id: (req as any).user.id,
    email: (req as any).user.email
  });
}