import { Router } from "express";
import userRoutes from "./userRoutes";
import loginRoutes from "./loginRoutes";

const router = Router();

router.use("/users", userRoutes);      
router.use("/login", loginRoutes);

export default router;
