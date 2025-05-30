import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: "Token não encontrado." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === "object" && "id" in decoded && "email" in decoded) {
      (req as any).user = {
        id: (decoded as JwtPayload).id,
        email: (decoded as JwtPayload).email,
      };


      next();
    
    } else {
      res.status(401).json({ error: "Token inválido ou malformado." });
      return;
    }
  } catch (err) {
    res.status(401).json({ error: "Token inválido ou expirado." });
    return;
  }
}
