import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Maintenance } from "../interface/MaintenanceInterface";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  assetId: string;
}

export default function MaintenanceHistoryModal({
  isOpen,
  onClose,
  assetId,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    fetch(`http://localhost:3000/api/maintenances/byAsset?assetId=${assetId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setMaintenances)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isOpen, assetId]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Histórico de Manutenções</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <CircularProgress />
        ) : maintenances.length === 0 ? (
          <p>Nenhuma manutenção registrada para este ativo.</p>
        ) : (
          <List>
            {maintenances.map((m) => (
              <ListItem key={m.id}>
                <ListItemText
                  primary={m.maintenance}
                  secondary={`${m.description || "Sem descrição"} — ${
                    m.performed_at
                      ? "Realizada em: " +
                        new Date(m.performed_at).toLocaleDateString()
                      : "Ainda não realizada"
                  }`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}
