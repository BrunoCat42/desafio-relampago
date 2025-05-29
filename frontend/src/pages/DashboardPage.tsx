import { useState } from "react";
import { useAssets } from "../context/AssetsContext";
import AssetTable from "../components/AssetTable";
import AssetModal from "../components/AssetModal";
import type { Asset, NewAsset } from "../interface/AssetInterface";

export default function DashboardPage() {
  const { isLoading, error, assets, createAsset, updateAsset } = useAssets();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState<Asset | null>(null);

  const handleOpenCreateModal = () => {
    setAssetToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const asset = assets.find((a) => a.id === id);
    if (asset) {
      setAssetToEdit(asset);
      setIsModalOpen(true);
    }
  };

const handleSave = (data: NewAsset) => {
  if (assetToEdit) {
    updateAsset({ ...assetToEdit, ...data });
  } else {
    createAsset(data);
  }
  setIsModalOpen(false);
};

    const handleViewMaintenances = (id: string) => {
      console.log("Ver Manutenções do ativo", id);
    };

    return (
      <div>
        <h1>Dashboard</h1>
        <button onClick={handleOpenCreateModal}>Novo Ativo</button>

        {isLoading && <p>Carregando ativos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <AssetTable
          onEdit={handleEdit}
          onViewMaintenances={handleViewMaintenances}
        />

        <AssetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          assetToEdit={assetToEdit}
        />
      </div>
    );
  };
