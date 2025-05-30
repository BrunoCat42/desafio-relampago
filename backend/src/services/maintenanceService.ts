import {
  createMaintenance,
  getMaintenances,
  removeMaintenance,
  updateMaintenance,
} from "../database/maintenanceRepository";

import { Maintenance, NewMaintenance } from "../interfaces/Maintenance";

export async function addMaintenance(
  assetId: string,
  data: NewMaintenance
): Promise<Maintenance> {
  return await createMaintenance(assetId, data);
}

export async function listMaintenances(
  assetId: string
): Promise<Maintenance[]> {
  return await getMaintenances(assetId);
}

export async function deleteMaintenance(
  maintenanceId: string
): Promise<void> {
  return await removeMaintenance(maintenanceId);
}

export async function modifyMaintenance(
  maintenanceId: string,
  data: Partial<NewMaintenance>
): Promise<Maintenance | null> {
  return await updateMaintenance(maintenanceId, data);
}
