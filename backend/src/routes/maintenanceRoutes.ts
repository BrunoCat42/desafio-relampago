import { Router } from "express";
import {
  postMaintenance,
  getAllMaintenances,
  patchMaintenanceById,
  deleteMaintenanceById,
} from "../controllers/maintenanceController";

const router = Router();

router.post("/", postMaintenance);
router.get("/", getAllMaintenances);
router.patch("/:maintenanceId", patchMaintenanceById);
router.delete("/:maintenanceId", deleteMaintenanceById);

export default router;
