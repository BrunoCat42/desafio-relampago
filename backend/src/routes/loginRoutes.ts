import { Router } from "express";
import { loginUser, checkLogin, logoutUser } from "../controllers/loginController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", loginUser);
router.get("/check", authMiddleware, checkLogin);
router.post("/logout", authMiddleware, logoutUser)

export default router;
