//CORRIGIR (req as any), e entender o que está acontecendo

import { Request, Response } from "express";
import {
  createAsset,
  getAssetsByUser,
  getAsset,
  editAsset,
  removeAsset,
} from "../services/assetsService";

export async function postAsset(req: Request, res: Response) {
  const { name, description } = req.body;
  const { userId } = (req as any).user as { userId: string };

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const asset = await createAsset({ name, description }, userId);
  return res.status(201).json(asset);
}

export async function getAssets(req: Request, res: Response) {
  const { userId } = (req as any).user as { userId: string };
  const assets = await getAssetsByUser(userId);
  return res.status(200).json(assets);
}

export async function getAssetById(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = (req as any).user as { userId: string };

  const asset = await getAsset(id, userId);
  if (!asset) {
    return res.status(404).json({ error: "Asset not found" });
  }

  return res.status(200).json(asset);
}

export async function patchAsset(req: Request, res: Response) {
  const { id } = req.params;
  const { name, description } = req.body;
  const { userId } = (req as any).user as { userId: string };

  const asset = await editAsset(id, userId, name, description);
  if (!asset) {
    return res.status(404).json({ error: "Asset not found or not yours" });
  }

  return res.status(200).json(asset);
}

export async function deleteAssetById(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = (req as any).user as { userId: string };

  await removeAsset(id, userId);
  return res.status(204).send(); // No Content
}
