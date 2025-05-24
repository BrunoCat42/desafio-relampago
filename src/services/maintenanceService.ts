import {
  insertMaintenance,
  listMaintenancesForAsset,
  deleteMaintenance,
} from "../database/maintenanceRepository";
import { NewMaintenance } from "../interfaces/Maintenance";

export async function createMaintenance(assetId: string, data: NewMaintenance) {
  return await insertMaintenance(
    assetId,
    data.maintenance,
    data.description,
    data.performed_at,
    data.next_due_date
  );
}

export async function getMaintenances(assetId: string) {
  return await listMaintenancesForAsset(assetId);
}

export async function removeMaintenance(id: string, assetId: string) {
  return await deleteMaintenance(id, assetId);
}
