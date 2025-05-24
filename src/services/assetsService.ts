import { insertAsset, listUserAssets } from "../database/assetsRepository";
import { NewAsset } from "../interfaces/Assets";

export async function createAsset(asset: NewAsset, userId: string) {
  return await insertAsset(asset.name, asset.description, userId);
}

export async function getAssetsByUser(userId: string) {
  return await listUserAssets(userId);
}
