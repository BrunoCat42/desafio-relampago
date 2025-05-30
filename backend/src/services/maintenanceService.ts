import {
  createMaintenance,
  getMaintenancesById,
  removeMaintenance,
  updateMaintenance,
  findAllMaintenances
} from "../database/maintenanceRepository";

import { Maintenance, NewMaintenance } from "../interfaces/Maintenance";

export async function addMaintenance(
  assetId: string,
  data: NewMaintenance
): Promise<Maintenance> {
  return await createMaintenance(assetId, data);
}

export async function listMaintenancesById(
  assetId: string
): Promise<Maintenance[]> {
  return await getMaintenancesById(assetId);
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

export async function getAllMaintenances() {
  return await findAllMaintenances();
}