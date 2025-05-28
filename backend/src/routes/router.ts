import { Router } from "express";
import userRoutes from "./userRoutes";
import loginRoutes from "./loginRoutes";
import assetsRoutes from "./assetsRoutes"

const router = Router();

router.use("/users", userRoutes);      
router.use("/login", loginRoutes);
router.use("/assets", assetsRoutes)

export default router;
