import type { Maintenance } from "../interface/MaintenanceInterface";

interface MaintenanceTableProps {
  data: Maintenance[];
  onEdit?: (maintenanceId: string) => void;
  onDelete?: (maintenanceId: string) => void;
}

export default function MaintenanceTable({ data, onEdit, onDelete }: MaintenanceTableProps) {
  return (
    <table className="w-full border-collapse border border-gray-300 mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Tipo</th>
          <th className="border p-2">Descrição</th>
          <th className="border p-2">Realizada em</th>
          <th className="border p-2">Próxima manutenção</th>
          {onEdit && <th className="border p-2">Ações</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="border p-2">{item.maintenance}</td>
            <td className="border p-2">{item.description}</td>
            <td className="border p-2">{new Date(item.performed_at).toLocaleDateString()}</td>
            <td className="border p-2">{item.next_due_date ? new Date(item.next_due_date).toLocaleDateString() : '-'}</td>
            {onEdit && (
              <td className="border p-2 space-x-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => onEdit(item.id)}
                >
                  Editar
                </button>
                {onDelete && (
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => onDelete(item.id)}
                  >
                    Excluir
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}