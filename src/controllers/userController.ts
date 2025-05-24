import { Request, Response } from "express";
import { createUser } from "../services/userService";
import { NewUser } from "../interfaces/User";

export async function registerUser(req: Request<NewUser>, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  try {
    const newUser = await createUser({ name, email, password });
    res.status(201).json(newUser);
    return;
  } catch (err: any) {
    console.error("Error registering user:", err);

    if (err.code === "23505") {
      res.status(409).json({ error: "Email already registered." });
      return;
    }
    
    res.status(500).json({ error: "Internal server error." });
    return;
  }
}
