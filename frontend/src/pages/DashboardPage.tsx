import { useEffect, useState } from "react";
import MaintenanceTable from "../components/MaintenanceTable";
import MaintenanceModal from "../components/MaintenanceModal";
import type { Maintenance, NewMaintenance } from "../interface/MaintenanceInterface";

export default function DashboardPage() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAssetId, setSelectedAssetId] = useState("");

  useEffect(() => {
    async function fetchMaintenances() {
      try {
        const res = await fetch(`http://localhost:3000/api/maintenances`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Erro ao buscar manutenções");
        const data = await res.json();
        setMaintenances(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMaintenances();
  }, [selectedAssetId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manutenções</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Nova Manutenção
      </button>

      {isLoading ? (
        <p>Carregando manutenções...</p>
      ) : (
        <MaintenanceTable data={maintenances} />
      )}

      <MaintenanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        assetId={selectedAssetId || "ID_FIXO_PARA_TESTE"}
        onSave={async (data: NewMaintenance) => {
          try {
            const response = await fetch("http://localhost:3000/api/maintenance", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              const errData = await response.json();
              throw new Error(errData.error || "Erro ao salvar manutenção");
            }

            const newMaintenance = await response.json();
            setMaintenances((prev) => [newMaintenance, ...prev]);
            setIsModalOpen(false);
          } catch (err: any) {
            alert("Erro ao salvar manutenção: " + err.message);
          }
        }}
      />
    </div>
  );
}
