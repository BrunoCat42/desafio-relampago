import {
  insertAsset,
  listUserAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} from "../database/assetsRepository";
import { NewAsset } from "../interfaces/Assets";

export async function createAsset(asset: NewAsset, userId: string) {
  return await insertAsset(asset.name, asset.description, userId);
}

export async function getAssetsByUser(userId: string) {
  return await listUserAssets(userId);
}

export async function getAsset(id: string, userId: string) {
  return await getAssetById(id, userId);
}

export async function editAsset(id: string, userId: string, name?: string, description?: string) {
  return await updateAsset(id, userId, name, description);
}

export async function removeAsset(id: string, userId: string) {
  return await deleteAsset(id, userId);
}
