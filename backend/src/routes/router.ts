import { Router } from "express";
import userRoutes from "./userRoutes";
import loginRoutes from "./loginRoutes";
import assetsRoutes from "./assetsRoutes"
import maintenanceRoutes from "./maintenanceRoutes"


const router = Router();

router.use("/users", userRoutes);      
router.use("/login", loginRoutes);
router.use("/assets", assetsRoutes)
router.use("/maintenances", maintenanceRoutes)

export default router;
