import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardAssets from "./pages/DashboardAssets";
import DashboardPage from "./pages/DashboardPage";
import { MaintenancesProvider } from "./context/MaintenanceContext";
import PrivateRoute from "./components/PrivateRoute";

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
          <PrivateRoute>
            <MaintenancesProvider>
              <DashboardPage />
            </MaintenancesProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/assets"
        element={
          <PrivateRoute>
            <DashboardAssets />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
