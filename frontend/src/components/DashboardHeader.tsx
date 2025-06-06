import MyButton from "./Button";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type DashboardHeaderProps = {
  assetButton?: boolean;
};

export function DashboardHeader({ assetButton = false }: DashboardHeaderProps) {
  const { user, logout } = useAuth();
  const username = user?.name || "Usuário";
  const location = useLocation();
  const navigate = useNavigate();

  const onAssets = location.pathname === "/dashboard-assets";
  const onMaintenances = location.pathname === "/dashboard";

  return (
    <AppBar position="static" color="transparent" elevation={0} className="dashboard-header">
      <Toolbar>
        <Box flex={1}>
          <Typography variant="h6">Bem-vindo, {username}</Typography>
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
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
            color="primary"
            variant="contained"
          >
            Sair
          </MyButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
