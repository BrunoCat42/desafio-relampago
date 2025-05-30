import MyButton from "./Button"; // Use o nome real do seu botão customizado!
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink, useLocation } from "react-router-dom";

type DashboardHeaderProps = {
  assetButton?: boolean;
};

export function DashboardHeader({ assetButton = false }: DashboardHeaderProps) {
  const { user } = useAuth();
  const username = user?.email || "Usuário";
  const location = useLocation();
  const onAssets = location.pathname === "/dashboard-assets";
  const onMaintenances = location.pathname === "/dashboard";

  return (
    <AppBar position="static" color="transparent" elevation={0} className="dashboard-header">
      <Toolbar>
        <Box flex={1}>
          <Typography variant="h6">Bem vindo, {username}</Typography>
        </Box>
        <Box>
          {assetButton && !onAssets && (
            <MyButton
              color="secondary"
              variant="outlined"
              component={RouterLink}
              to="/assets"
            >
              Ir para Ativos
            </MyButton>
          )}
          {!assetButton && !onMaintenances && (
            <MyButton
              color="secondary"
              variant="outlined"
              component={RouterLink}
              to="/dashboard"
            >
              Ir para Manutenções
            </MyButton>
          )}
        </Box>
        <Box flex={1} display="flex" justifyContent="flex-end">
          <MyButton
            color="primary"
            variant="contained"
            component={RouterLink}
            to="/login"
          >
            Login
          </MyButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}