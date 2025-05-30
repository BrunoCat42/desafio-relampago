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
import type { AssetModalProps } from "../interface/AssetInterface";

export default function AssetModal({
  isOpen,
  onClose,
  onSave,
  assetToEdit,
}: AssetModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (assetToEdit) {
      setName(assetToEdit.name);
      setDescription(assetToEdit.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [assetToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const assetData = assetToEdit
      ? { id: assetToEdit.id, name, description }
      : { name, description };

    onSave(assetData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="asset-dialog-title">
      <form onSubmit={handleSubmit}>
        <DialogTitle id="asset-dialog-title">
          {assetToEdit ? "Editar Ativo" : "Novo Ativo"}
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              minRows={2}
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