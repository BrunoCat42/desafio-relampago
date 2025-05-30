import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAssets } from "../context/AssetsContext";
import AssetTable from "../components/AssetTable";
import AssetModal from "../components/AssetModal";
import type { Asset, NewAsset } from "../interface/AssetInterface";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const {
    isLoading: isAssetsLoading,
    assets,
    createAsset,
    updateAsset,
  } = useAssets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState<Asset | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [isLoading, user, navigate]);

  if (isLoading) return <p>Verificando autenticação...</p>;
  if (!user) return null;

  const handleOpenModal = () => {
    setAssetToEdit(null);
    setIsModalOpen(true);
  };

const handleEditAsset = (id: string) => {
  const asset = assets.find((a) => a.id === id);
  if (!asset) return;
  setAssetToEdit(asset);
  setIsModalOpen(true);
};


  const handleSaveAsset = (asset: NewAsset|Asset) => {
    if ("id" in asset) {
      updateAsset(asset);
    } else {
      createAsset(asset);
    }
    setIsModalOpen(false);
    setAssetToEdit(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAssetToEdit(null);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleOpenModal}>Novo Ativo</button>

      {isAssetsLoading ? (
        <p>Carregando ativos...</p>
      ) : (
        <AssetTable
          onEdit={handleEditAsset}
          onViewMaintenances={(id) => {
            console.log("Visualizar manutenções de", id); // placeholder
          }}
        />
      )}

      <AssetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAsset}
        assetToEdit={assetToEdit}
      />
    </div>
  );
}
