import { Router } from "express";
import { loginUser, checkLogin } from "../controllers/loginController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", loginUser);
router.get("/check", authMiddleware, checkLogin);

export default router;
