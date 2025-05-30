import { useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import type { Asset, NewAsset } from "../interface/AssetInterface";

interface AssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NewAsset) => void;
  initialData?: Asset | null;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export default function AssetModal({ isOpen, onClose, onSave, initialData }: AssetModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewAsset>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          name: initialData.name ?? "",
          description: initialData.description ?? "",
        });
      } else {
        reset({
          name: "",
          description: "",
        });
      }
    }
  }, [initialData, reset, isOpen]);

  const onSubmit = async (data: NewAsset) => {
    await onSave(data);
    };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" mb={2}>
          {initialData ? "Editar Ativo" : "Novo Ativo"}
        </Typography>
        <TextField
          label="Nome"
          {...register("name", { required: "Nome obrigatório" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          autoFocus
        />
        <TextField
          label="Descrição"
          {...register("description", { required: "Descrição obrigatória" })}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          multiline
          minRows={2}
        />
        <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}