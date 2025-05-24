import { Request, Response } from "express";
import { createAsset, getAssetsByUser } from "../services/assetsService";
import { NewAsset } from "../interfaces/Assets";

export async function postAsset(req: Request, res: Response) {
  const { name, description } = req.body as NewAsset;
  const { userId } = (req as any).user as { userId: string };

  if (!name) {
     res.status(400).json({ error: "Name is required" });
     return
  }

  const asset = await createAsset({ name, description }, userId);
   res.status(201).json(asset);
   return
}

export async function getAssets(req: Request, res: Response) {
  const { userId } = (req as any).user as { userId: string };
  const assets = await getAssetsByUser(userId);
  res.status(200).json(assets);
  return
}
