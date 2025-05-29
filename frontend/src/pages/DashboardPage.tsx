import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAssets } from "../context/AssetsContext";
import AssetTable from "../components/AssetTable";
import AssetModal from "../components/AssetModal";
import type { Asset, NewAsset } from "../interface/AssetInterface";

export default function DashboardPage() {
  const { isLoading, error, assets, createAsset, updateAsset } = useAssets();
  const {setUser, setIsLoading} = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState<Asset | null>(null);
  const navigate = useNavigate()

useEffect(() => {
  const checkLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/login/check", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Não autenticado");

      const data = await res.json();
      setUser({ id: data.id, email: data.email });
    } catch {
      setUser(null);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  checkLogin();
}, []);

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
