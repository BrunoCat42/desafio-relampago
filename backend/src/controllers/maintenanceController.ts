import { Request, Response } from "express";
import {
  addMaintenance,
  listMaintenancesById,
  deleteMaintenance,
  modifyMaintenance,
  getAllMaintenances
} from "../services/maintenanceService";
import { NewMaintenance } from "../interfaces/Maintenance";

export async function postMaintenance(req: Request, res: Response) {
  const { assetId, maintenance, description, next_due_date, completed } =
    req.body as NewMaintenance & { assetId: string; completed?: boolean };

  const performed_at = req.body.performed_at === "" ? null : req.body.performed_at;

  if (!assetId || !maintenance || !description || !next_due_date) {
    res.status(400).json({ error: "One or more fields are required" });
    return;
  }

  const record = await addMaintenance(assetId, {
    maintenance,
    description,
    performed_at,
    next_due_date,
    completed: completed ?? false,
  });

  res.status(201).json(record);
}

export async function getMaintenancesById(req: Request, res: Response) {
  const assetId = req.query.assetId as string;
  if (!assetId) {
    res.status(400).json({ error: "Asset ID is required" });
    return;
  }
  const list = await listMaintenancesById(assetId);
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
  const updateData = { ...req.body };

  if (!maintenanceId) {
    res.status(400).json({ error: "Maintenance ID is required" });
    return;
  }

  // Se performed_at está sendo definido, completed também deve virar true
  if (updateData.performed_at && updateData.completed === undefined) {
    updateData.completed = true;
  }

  const updated = await modifyMaintenance(maintenanceId, updateData);

  if (!updated) {
    res.status(404).json({ error: "Maintenance not found" });
    return;
  }

  res.status(200).json(updated);
}

export async function getMaintenances(req: Request, res: Response) {
  try {
    const maintenances = await getAllMaintenances();
    res.status(200).json(maintenances);
    return;
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar manutenções." });
    return;
  }
}