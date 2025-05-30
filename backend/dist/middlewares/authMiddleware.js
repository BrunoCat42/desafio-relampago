"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: "Token não encontrado." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "object" && "id" in decoded && "email" in decoded) {
            req.user = {
                id: decoded.id,
                email: decoded.email,
            };
            next();
        }
        else {
            res.status(401).json({ error: "Token inválido ou malformado." });
            return;
        }
    }
    catch (err) {
        res.status(401).json({ error: "Token inválido ou expirado." });
        return;
    }
}
