import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from "@mui/material";
import type { Maintenance, NewMaintenance } from "../interface/MaintenanceInterface";

interface MaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NewMaintenance) => void;
  assetId: string;
  initialData?: Maintenance;
}

export default function MaintenanceModal({
  isOpen,
  onClose,
  onSave,
  assetId,
  initialData,
}: MaintenanceModalProps) {
  const [maintenance, setMaintenance] = useState("");
  const [description, setDescription] = useState("");
  const [performedAt, setPerformedAt] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setMaintenance(initialData.maintenance);
      setDescription(initialData.description);
      setPerformedAt(initialData.performed_at?.slice(0, 10)||"");
      setNextDueDate(initialData.next_due_date?.slice(0, 10));

    } else {
      setMaintenance("");
      setDescription("");
      setPerformedAt("");
      setNextDueDate("");
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      assetId,
      maintenance,
      description,
      performed_at: performedAt,
      next_due_date: nextDueDate,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="maintenance-dialog-title">
      <form onSubmit={handleSubmit}>
        <DialogTitle id="maintenance-dialog-title">
          {initialData ? "Editar Manutenção" : "Nova Manutenção"}
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Tipo"
              value={maintenance}
              onChange={(e) => setMaintenance(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              multiline
              minRows={2}
            />
            <TextField
              label="Realizada em"
              type="date"
              value={performedAt}
              onChange={(e) => setPerformedAt(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Próxima manutenção"
              type="date"
              required

              value={nextDueDate}
              onChange={(e) => setNextDueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}