import { Router } from "express";
import { postAsset, getAssets } from "../controllers/assetsController";

const router = Router();

router.post("/", postAsset);
router.get("/", getAssets);

export default router;
