import { TableRow, TableCell, Button, Stack } from "@mui/material";
import { useState } from "react";
import MaintenanceModal from "./MaintenanceModal";
import MaintenanceHistoryModal from "./MaintenanceHistoryModal";
import { useAssets } from "../context/AssetsContext";
import type { AssetRowProps } from "../interface/AssetInterface";
import type { NewMaintenance } from "../interface/MaintenanceInterface";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildIcon from "@mui/icons-material/Build";
import HistoryIcon from "@mui/icons-material/History";

export default function AssetRow({ asset, onEdit }: AssetRowProps) {
  const { deleteAsset } = useAssets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleSave = async (data: NewMaintenance) => {
    try {
      await fetch("http://localhost:3000/api/maintenances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...data, assetId: asset.id }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{asset.name}</TableCell>
        <TableCell align="center">{asset.description}</TableCell>
        <TableCell align="center">
          <Stack direction="row" spacing={1} justifyContent="center">
            <Button
              variant="contained"
              size="small"
              color="secondary"
              startIcon={<BuildIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Manutenção
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="info"
              startIcon={<HistoryIcon />}
              onClick={() => setIsHistoryOpen(true)}
            >
              Histórico
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => onEdit(asset.id)}
            >
              Editar
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => deleteAsset(asset.id)}
            >
              Excluir
            </Button>
          </Stack>
        </TableCell>
      </TableRow>

      <MaintenanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        assetId={asset.id}
      />

      <MaintenanceHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        assetId={asset.id}
      />
    </>
  );
}
