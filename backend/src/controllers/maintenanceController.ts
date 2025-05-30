import { Request, Response } from "express";
import {
  addMaintenance,
  listMaintenances,
  deleteMaintenance,
  modifyMaintenance,
} from "../services/maintenanceService";
import { NewMaintenance } from "../interfaces/Maintenance";

export async function postMaintenance(req: Request, res: Response) {
  const { assetId, maintenance, description, performed_at, next_due_date } =
    req.body as NewMaintenance & { assetId: string };

  if (!assetId || !maintenance || !description || !performed_at) {
    res.status(400).json({ error: "One or more fields are required" });
    return;
  }

  const record = await addMaintenance(assetId, {
    maintenance,
    description,
    performed_at,
    next_due_date,
  });

  res.status(201).json(record);
}

export async function getAllMaintenances(req: Request, res: Response) {
  const assetId = req.body.assetId as string;
  if (!assetId) {
    res.status(400).json({ error: "Asset ID is required" });
    return;
  }
  const list = await listMaintenances(assetId);
  res.status(200).json(list);
}

export async function deleteMaintenanceById(req: Request, res: Response) {
  const { maintenanceId } = req.params;
  if (!maintenanceId) {
    res.status(400).json({ error: "Maintenance ID is required" });
    return;
  }
  await deleteMaintenance(maintenanceId);
  res.status(204).send();
}

export async function patchMaintenanceById(req: Request, res: Response) {
  const { maintenanceId } = req.params;
  const updateData = req.body;

  if (!maintenanceId) {
    res.status(400).json({ error: "Maintenance ID is required" });
    return;
  }

  const updated = await modifyMaintenance(maintenanceId, updateData);

  if (!updated) {
    res.status(404).json({ error: "Maintenance not found" });
    return;
  }

  res.status(200).json(updated);
}
