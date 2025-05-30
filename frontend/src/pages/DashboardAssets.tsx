import { useState } from "react";
import AssetTable from "../components/AssetTable";
import AssetModal from "../components/AssetModal";
import type { NewAsset } from "../interface/AssetInterface";
import { useAssets } from "../context/AssetsContext";
import { Paper, Typography, Button, Box } from "@mui/material";
import { DashboardHeader } from "../components/DashboardHeader";

export default function DashboardAssets() {
  const { isLoading, createAsset } = useAssets();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="dashboard-bg">
      <Paper elevation={12} className="dashboard-paper" sx={{ width: "90vw", maxWidth: 1100 }}>
        <DashboardHeader assetButton={false} />
        <Box p={4}>
          <Typography variant="h4" fontWeight="bold" mb={4} className="dashboard-title">
            Ativos
          </Typography>
          <Button
            onClick={() => setIsModalOpen(true)}
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
              onEdit={(id) => {
                console.log("Editar ativo:", id);
              }}
              onViewMaintenances={(id) => {
                console.log("Visualizar manutenções de:", id);
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
        </Box>
      </Paper>
    </div>
  );
}