import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import type { Maintenance } from "../interface/MaintenanceInterface";
import MaintenanceStatusChip from "./MaintenanceStatus";

interface Props {
  data: Maintenance[];
  getAssetName: (asset_id: string) => string;
  onDone: (maintenanceId: string) => void;
}

export default function MaintenanceTable({
  data,
  getAssetName,
  onDone,
}: Props) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Ativo</TableCell>
            <TableCell align="center">Tipo</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Próxima manutenção</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell align="center">
                  {getAssetName(item.asset_id)}
                </TableCell>
                <TableCell align="center">{item.maintenance}</TableCell>
                <TableCell align="center">{item.description || "—"}</TableCell>
                <TableCell align="center">
                  {item.next_due_date
                    ? new Date(item.next_due_date).toLocaleDateString()
                    : "—"}
                </TableCell>
                <TableCell align="center">
                  <MaintenanceStatusChip
                    completed={item.completed}
                    next_due_date={item.next_due_date}
                  />
                </TableCell>
                <TableCell align="center">
                  {!item.completed && (
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={() => onDone(item.id)}
                    >
                      Marcar como feita
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Nenhuma manutenção registrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
