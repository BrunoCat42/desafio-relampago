import { Router } from "express";
import {
  postAsset,
  getAssets,
  getAssetById,
  patchAsset,
  deleteAssetById,
} from "../controllers/assetsController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware)

router.post("/", postAsset);
router.get("/", getAssets);
router.get("/:id", getAssetById);
router.patch("/:id", patchAsset);
router.delete("/:id", deleteAssetById);

export default router;
