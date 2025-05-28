// src/pages/DashboardPage.tsx
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      {/* Menu do usuário */}
      <div style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
        <h2>Bem-vindo, {user?.email || "usuário"}!</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* Área principal (tabela e ações futuras) */}
      <div>
        <h3>Área dos Ativos e Manutenções</h3>
        <div style={{ border: "1px dashed #888", height: "300px", marginTop: "1rem", padding: "1rem" }}>
          (Aqui ficará a tabela com os ativos e controles)
        </div>
      </div>
    </div>
  );
}
