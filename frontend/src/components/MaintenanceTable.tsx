import type { Maintenance } from "../interface/MaintenanceInterface";
import { Button } from "@mui/material";

interface Props {
  data: Maintenance[];
  getAssetName: (asset_id: string) => string;
  onDone: (maintenanceId: string) => void;
}

export default function MaintenanceTable({ data, getAssetName, onDone }: Props) {
  return (
    <table className="w-full border-collapse border border-gray-300 mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Ativo</th>
          <th className="border p-2">Tipo</th>
          <th className="border p-2">Descrição</th>
          <th className="border p-2">Realizada em</th>
          <th className="border p-2">Próxima manutenção</th>
          <th className="border p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="border p-2">{getAssetName(item.asset_id)}</td>
            <td className="border p-2">{item.maintenance}</td>
            <td className="border p-2">{item.description}</td>
            <td className="border p-2">{item.performed_at ? new Date(item.performed_at).toLocaleDateString() : "-"}</td>
            <td className="border p-2">{item.next_due_date ? new Date(item.next_due_date).toLocaleDateString() : '-'}</td>
            <td className="border p-2">
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={() => onDone(item.id)}
              >
                Marcar como feita
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}