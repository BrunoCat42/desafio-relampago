import { useEffect, useState } from "react";
import MaintenanceTable from "../components/MaintenanceTable";
import MaintenanceModal from "../components/MaintenanceModal";
import type { Maintenance, NewMaintenance } from "../interface/MaintenanceInterface";
import { Paper, Typography, Button, Box, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { DashboardHeader } from "../components/DashboardHeader";

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
    <div className="dashboard-bg">
      <Paper elevation={12} className="dashboard-paper" sx={{ width: "90vw", maxWidth: 1100 }}>
        <DashboardHeader assetButton={true} />
        <Box p={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
            className="dashboard-header"
          >
            <Typography variant="h4" fontWeight="bold" className="dashboard-title">
              Manutenções
            </Typography>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
            sx={{ mb: 3 }}
            className="dashboard-create-btn"
          >
            Nova Manutenção
          </Button>
          {isLoading ? (
            <Typography>Carregando manutenções...</Typography>
          ) : (
            <MaintenanceTable data={maintenances} />
          )}
        </Box>
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
      </Paper>
    </div>
  );
}