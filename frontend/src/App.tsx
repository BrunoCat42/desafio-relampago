import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardAssets from "./pages/DashboardAssets";
import DashboardPage from "./pages/DashboardPage";
import { MaintenancesProvider } from "./context/MaintenanceContext";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <p> Verificando sessão... </p>;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <MaintenancesProvider>
            <DashboardPage />
          </MaintenancesProvider>
        }
      />
      <Route path="/assets" element={<DashboardAssets />} />
    </Routes>
  );
}

export default App;
