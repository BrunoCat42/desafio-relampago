import { useEffect, useState } from "react";
import AssetTable from "../components/AssetTable";
import AssetModal from "../components/AssetModal";
import type { Asset, NewAsset } from "../interface/AssetInterface";
import { useAssets } from "../context/AssetsContext";

export default function DashboardAssets() {
  const { assets, isLoading, createAsset } = useAssets();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ativos</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Novo Ativo
      </button>

      {isLoading ? (
        <p>Carregando ativos...</p>
      ) : (
        <AssetTable
          onEdit={(id) => {
            console.log("Editar ativo:", id);
            // ou lógica real de edição
          }}
          onViewMaintenances={(id) => {
            console.log("Visualizar manutenções de:", id);
            // ou abrir modal de manutenções, etc.
          }}
        />
      )}

      <AssetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (data: NewAsset) => {
          await createAsset(data);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
