import { Router } from "express";
import {
  postMaintenance,
  getAllMaintenances,
  deleteMaintenanceById,
} from "../controllers/maintenanceController";

const router = Router({ mergeParams: true });

router.post("/", postMaintenance);
router.get("/", getAllMaintenances);
router.delete("/:id", deleteMaintenanceById);

export default router;
