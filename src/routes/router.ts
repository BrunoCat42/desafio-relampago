import { Router } from "express";
import userRoutes from "./userRoutes";
import loginRoutes from "./loginRoutes";
import assetsRoutes from "./assetsRoutes"
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use("/users", userRoutes);      
router.use("/login", loginRoutes);
router.use("/assets", authMiddleware, assetsRoutes)

export default router;
