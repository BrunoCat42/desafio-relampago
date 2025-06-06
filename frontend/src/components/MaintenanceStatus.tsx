import { Chip } from "@mui/material";

interface Props {
  completed: boolean;
  next_due_date?: string;
}

export default function MaintenanceStatusChip({ completed, next_due_date }: Props) {
  if (completed) {
    return <Chip label="Realizada" color="success" size="small" />;
  }

  if (!next_due_date) {
    return <Chip label="Sem data" color="default" size="small" />;
  }

  const now = new Date();
  const dueDate = new Date(next_due_date);
  const diffTime = dueDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (dueDate < now) {
    return <Chip label="Atrasada" color="error" size="small" />;
  } else if (diffDays <= 7) {
    return <Chip label="Urgente" color="warning" size="small" />;
  } else {
    return <Chip label="Pendente" color="info" size="small" />;
  }
}
