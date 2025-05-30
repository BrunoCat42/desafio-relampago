import { useState, useEffect } from "react";
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
      setPerformedAt(initialData.performed_at.slice(0, 10));
      setNextDueDate(initialData.next_due_date?.slice(0, 10) || "");
    }
  }, [initialData]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Editar Manutenção" : "Nova Manutenção"}
        </h2>

        <label className="block mb-2">
          Tipo:
          <input
            className="w-full border rounded p-2"
            value={maintenance}
            onChange={(e) => setMaintenance(e.target.value)}
            required
          />
        </label>

        <label className="block mb-2">
          Descrição:
          <textarea
            className="w-full border rounded p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label className="block mb-2">
          Realizada em:
          <input
            type="date"
            className="w-full border rounded p-2"
            value={performedAt}
            onChange={(e) => setPerformedAt(e.target.value)}
            required
          />
        </label>

        <label className="block mb-4">
          Próxima manutenção:
          <input
            type="date"
            className="w-full border rounded p-2"
            value={nextDueDate}
            onChange={(e) => setNextDueDate(e.target.value)}
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}