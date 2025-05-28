import { Request, Response } from "express";
import {
  createMaintenance,
  getMaintenances,
  removeMaintenance,
  updateMaintenance,
} from "../services/maintenanceService";
import { NewMaintenance } from "../interfaces/Maintenance";

export async function postMaintenance(req: Request, res: Response) {
  const { assetId } = req.params;
  const { maintenance, description, performed_at, next_due_date } =
    req.body as NewMaintenance;

  if (!maintenance || !description || !performed_at) {
    res.status(400).json({ error: "One or more field are required" });
    return;
  }

  const record = await createMaintenance(assetId, {
    maintenance,
    description,
    performed_at,
    next_due_date,
  });

  res.status(201).json(record);
  return;
}

export async function getAllMaintenances(req: Request, res: Response) {
  const { assetId } = req.params;
  const list = await getMaintenances(assetId);
  res.status(200).json(list);
  return;
}

export async function deleteMaintenanceById(req: Request, res: Response) {
  const { id, assetId } = req.params;
  await removeMaintenance(id, assetId);
  res.status(204).send();
  return;
}

export async function patchMaintenanceById(req: Request, res: Response) {
  try {
    const assetId = req.params.assetId;
    const maintenanceId = req.params.id;
    const updateData = req.body;

    if (!assetId || !maintenanceId) {
      res
        .status(400)
        .json({ message: "Asset ID e Maintenance ID são obrigatórios." });
      return;
    }

    const updated = await updateMaintenance(assetId, maintenanceId, updateData);

    if (!updated) {
      res.status(404).json({ message: "Manutenção não encontrada." });
      return;
    }

    res.status(200).json(updated);
    return;
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar manutenção." });
    return;
  }
}
