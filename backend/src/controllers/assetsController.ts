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
  const { id } = (req as any).user as { id: string };

  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const asset = await createAsset({ name, description }, id);
  res.status(201).json(asset);
  return;
}

export async function getAssets(req: Request, res: Response) {
  const { id } = (req as any).user as { id: string };
  const assets = await getAssetsByUser(id);
  res.status(200).json(assets);
  return;
}

export async function getAssetById(req: Request, res: Response) {
  const { id:assetId } = req.params;
  const { id } = (req as any).user as { id: string };

  const asset = await getAsset(assetId, id);
  if (!asset) {
    res.status(404).json({ error: "Asset not found" });
    return;
  }

  res.status(200).json(asset);
  return;
}

export async function patchAsset(req: Request, res: Response) {
  const { id:assetId } = req.params;
  const { name, description } = req.body as Asset;
  const { id } = (req as any).user as { id: string };

  const asset = await editAsset(assetId, id, name, description);
  if (!asset) {
    res.status(404).json({ error: "Asset not found or not yours" });
    return;
  }

  res.status(200).json(asset);
  return;
}

export async function deleteAssetById(req: Request, res: Response) {
  const { id:assetId } = req.params;
  const { id } = (req as any).user as { id: string };

  await removeAsset(assetId, id);
  res.status(204).send();
  return;
}
