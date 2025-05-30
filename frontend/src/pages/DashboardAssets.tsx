import { useState } from "react";
import AssetTable from "../components/AssetTable";
import AssetModal from "../components/AssetModal";
import type { NewAsset, Asset } from "../interface/AssetInterface";
import { useAssets } from "../context/AssetsContext";
import { Paper, Typography, Button, Box } from "@mui/material";
import { DashboardHeader } from "../components/DashboardHeader";

export default function DashboardAssets() {
  const { isLoading, createAsset, assets, updateAsset } = useAssets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAsset, setEditAsset] = useState<Asset | null>(null);

  const handleNewAsset = () => {
    setEditAsset(null);
    setIsModalOpen(true);
  };

  const handleEditAsset = (id: string) => {
    const asset = assets.find(a => a.id === id);
    if (asset) {
      setEditAsset(asset);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="dashboard-bg">
      <Paper elevation={12} className="dashboard-paper" sx={{ width: "90vw", maxWidth: 1100 }}>
        <DashboardHeader assetButton={false} />
        <Box p={4}>
          <Typography variant="h4" fontWeight="bold" mb={4} className="dashboard-title">
            Ativos
          </Typography>
          <Button
            onClick={handleNewAsset}
            variant="contained"
            color="primary"
            sx={{ mb: 3 }}
            className="dashboard-create-btn"
          >
            Novo Ativo
          </Button>
          {isLoading ? (
            <Typography>Carregando ativos...</Typography>
          ) : (
            <AssetTable
              onEdit={handleEditAsset}
              onViewMaintenances={(id) => {
                console.log("Visualizar manutenções de:", id);
              }}
            />
          )}

          <AssetModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditAsset(null);
            }}
            onSave={async (data: NewAsset) => {
              if (editAsset) {
                await updateAsset({ ...editAsset, ...data });
              } else {
                await createAsset(data);
              }
              setIsModalOpen(false);
              setEditAsset(null);
            }}
            initialData={editAsset}
          />
        </Box>
      </Paper>
    </div>
  );
}