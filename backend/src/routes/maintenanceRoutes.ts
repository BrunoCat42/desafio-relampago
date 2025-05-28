import { Router } from "express";
import {
  postMaintenance,
  getAllMaintenances,
  deleteMaintenanceById, 
  patchMaintenanceById
} from "../controllers/maintenanceController";

const router = Router({ mergeParams: true });

router.post("/", postMaintenance);
router.get("/", getAllMaintenances);
router.delete("/:id", deleteMaintenanceById);
router.patch("/:id", patchMaintenanceById);

export default router;
