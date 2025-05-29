import { useAssets } from "../context/AssetsContext";
import AssetTable from "../components/AssetTable";

export default function DashboardPage() {
  const { isLoading, error } = useAssets();

  const handleEdit = (id: string) => {
    console.log("Editar", id);
  };

  const handleViewMaintenances = (id: string) => {
    console.log("Ver Manutenções do ativo", id);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => console.log("Abrir modal de criação")}>Novo Ativo</button>

      {isLoading && <p>Carregando ativos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <AssetTable
        onEdit={handleEdit}
        onViewMaintenances={handleViewMaintenances}
      />
    </div>
  );
}