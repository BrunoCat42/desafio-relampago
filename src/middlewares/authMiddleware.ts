//CORRIGIR
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
const token = req.cookies.token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded; //CORRIGIR
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
    return;
  }
}
