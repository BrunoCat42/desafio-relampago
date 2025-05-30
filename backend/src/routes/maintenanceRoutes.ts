import { Router } from "express";
import {
  postMaintenance,
  getAllMaintenances,
  patchMaintenanceById,
  deleteMaintenanceById,
} from "../controllers/maintenanceController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware)

router.post("/", postMaintenance);
router.get("/", getAllMaintenances);
router.patch("/:maintenanceId", patchMaintenanceById);
router.delete("/:maintenanceId", deleteMaintenanceById);

export default router;
