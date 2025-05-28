//CORRIGIR (req as any), e entender o que está acontecendo

import { Request, Response } from "express";
import {
  createAsset,
  getAssetsByUser,
  getAsset,
  editAsset,
  removeAsset,
} from "../services/assetsService";
import { Asset, NewAsset } from "../interfaces/Assets";

export async function postAsset(req: Request, res: Response) {
  const { name, description } = req.body as NewAsset;
  const { userId } = (req as any).user as { userId: string };

  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const asset = await createAsset({ name, description }, userId);
  res.status(201).json(asset);
  return;
}

export async function getAssets(req: Request, res: Response) {
  const { userId } = (req as any).user as { userId: string };
  const assets = await getAssetsByUser(userId);
  res.status(200).json(assets);
  return;
}

export async function getAssetById(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = (req as any).user as { userId: string };

  const asset = await getAsset(id, userId);
  if (!asset) {
    res.status(404).json({ error: "Asset not found" });
    return;
  }

  res.status(200).json(asset);
  return;
}

export async function patchAsset(req: Request, res: Response) {
  const { id } = req.params;
  const { name, description } = req.body as Asset;
  const { userId } = (req as any).user as { userId: string };

  const asset = await editAsset(id, userId, name, description);
  if (!asset) {
    res.status(404).json({ error: "Asset not found or not yours" });
    return;
  }

  res.status(200).json(asset);
  return;
}

export async function deleteAssetById(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = (req as any).user as { userId: string };

  await removeAsset(id, userId);
  res.status(204).send();
  return;
}
