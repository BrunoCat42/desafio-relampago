import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAssets } from "../context/AssetsContext";
import AssetTable from "../components/AssetTable";
import AssetModal from "../components/AssetModal";
import type { Asset, NewAsset } from "../interface/AssetInterface";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const {
    assets,
    isLoading: isAssetsLoading,
    createAsset,
    updateAsset,
  } = useAssets();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState<Asset | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/login/check", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser({ id: data.id, email: data.email });
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Erro ao verificar login:", error);
        navigate("/login");
      }
    };

    checkLogin();
  }, [navigate, setUser]);

  const handleOpenModal = async () => {
    const response = await fetch("http://localhost:3000/api/login/check", {
      credentials: "include",
    });

    if (!response.ok) {
      navigate("/login");
      return;
    }

    setAssetToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditAsset = async (id: string) => {
    const response = await fetch("http://localhost:3000/api/login/check", {
      credentials: "include",
    });

    if (!response.ok) {
      navigate("/login");
      return;
    }

    const asset = assets.find((a) => a.id === id);
    if (asset) {
      setAssetToEdit(asset);
      setIsModalOpen(true);
    }
  };

  const handleSaveAsset = async (asset: NewAsset | Asset) => {
    const response = await fetch("http://localhost:3000/api/login/check", {
      credentials: "include",
    });

    if (!response.ok) {
      navigate("/login");
      return;
    }

    if ("id" in asset) {
      updateAsset(asset);
    } else {
      createAsset(asset);
    }

    handleCloseModal();
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
            console.log("Visualizar manutenções de", id);
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
