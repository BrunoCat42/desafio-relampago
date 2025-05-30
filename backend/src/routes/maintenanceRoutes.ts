import { Router } from "express";
import {
  postMaintenance,
  getMaintenancesById,
  patchMaintenanceById,
  deleteMaintenanceById,
  getMaintenances
} from "../controllers/maintenanceController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware)

router.post("/", postMaintenance);
router.get("/", getMaintenances)
router.get("/byAsset", getMaintenancesById);
router.patch("/:maintenanceId", patchMaintenanceById);
router.delete("/:maintenanceId", deleteMaintenanceById);

export default router;
