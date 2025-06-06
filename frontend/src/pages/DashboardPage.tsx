import { useMaintenances } from "../context/MaintenanceContext";
import { useAssets } from "../context/AssetsContext";
import MaintenanceTable from "../components/MaintenanceTable";
import { Paper, Typography, Box } from "@mui/material";
import { DashboardHeader } from "../components/DashboardHeader";

export default function DashboardPage() {
  const { maintenances, isLoading, error, reload, setMaintenanceDone } = useMaintenances();
  const { assets } = useAssets();

  function getAssetName(asset_id: string) {
    return assets.find((asset) => asset.id === asset_id)?.name || "Desconhecido";
  }

  async function handleDone(maintenanceId: string) {
    await setMaintenanceDone(maintenanceId);
    reload(); 
  }

  const maintenancesPendentes = maintenances.filter((m) => !m.completed);

  return (
    <div className="maintenances-bg">
      <Paper
        elevation={12}
        sx={{ width: "90vw", maxWidth: 1100, margin: "auto", mt: 4 }}
      >
        <DashboardHeader assetButton={true} />
        <Box p={4}>
          <Typography variant="h4" fontWeight="bold" mb={4}>
            Todas as Manutenções
          </Typography>
          {isLoading ? (
            <Typography>Carregando manutenções...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <MaintenanceTable
              data={maintenancesPendentes}
              getAssetName={getAssetName}
              onDone={handleDone}
            />
          )}
        </Box>
      </Paper>
    </div>
  );
}