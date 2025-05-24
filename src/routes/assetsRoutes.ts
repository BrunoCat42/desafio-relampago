import { Router } from "express";
import {
  postAsset,
  getAssets,
  getAssetById,
  patchAsset,
  deleteAssetById,
} from "../controllers/assetsController";
import { authMiddleware } from "../middlewares/authMiddleware";
import maintenanceRoutes from "./maintenanceRoutes"

const router = Router();

router.use(authMiddleware)

router.post("/", postAsset);
router.get("/", getAssets);
router.get("/:id", getAssetById);
router.patch("/:id", patchAsset);
router.delete("/:id", deleteAssetById);

router.use("/:id/maintenance", maintenanceRoutes)

export default router;
