import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Maintenance, NewMaintenance } from "../interface/MaintenanceInterface";

interface MaintenancesContextProps {
  maintenances: Maintenance[];
  isLoading: boolean;
  error: string | null;
  reload: () => void;
  addMaintenance: (data: NewMaintenance) => Promise<void>;
  setMaintenanceDone: (maintenanceId: string) => Promise<void>;
}

const MaintenancesContext = createContext<MaintenancesContextProps | undefined>(undefined);

export function MaintenancesProvider({ children }: { children: ReactNode }) {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/maintenances", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Erro ao buscar manutenções");
      const data: Maintenance[] = await res.json();

      // Corrigido: filtra e ordena os dados recebidos da API
      const filteredAndSorted = data
        .filter((m) => {
          const hoje = new Date().toISOString().split("T")[0];
          return (
            (!m.performed_at || m.performed_at === "") &&
            (!m.next_due_date || m.next_due_date >= hoje)
          );
        })
        .sort((a, b) => {
          if (!a.next_due_date) return 1;
          if (!b.next_due_date) return -1;
          return a.next_due_date.localeCompare(b.next_due_date);
        });

      setMaintenances(filteredAndSorted);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const setMaintenanceDone = async (maintenanceId: string) => {
    const now = new Date().toISOString();
    const response = await fetch(`http://localhost:3000/api/maintenances/${maintenanceId}`, {

      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ performed_at: now }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || "Erro ao marcar manutenção como feita");
    }
  };

  const addMaintenance = async (data: NewMaintenance) => {
    const response = await fetch("http://localhost:3000/api/maintenances", {

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
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <MaintenancesContext.Provider value={{
      maintenances, isLoading, error, reload, addMaintenance, setMaintenanceDone
    }}>
      {children}
    </MaintenancesContext.Provider>
  );
}

export function useMaintenances() {
  const context = useContext(MaintenancesContext);
  if (!context) throw new Error("useMaintenances deve ser usado dentro de um MaintenancesProvider");
  return context;
}
