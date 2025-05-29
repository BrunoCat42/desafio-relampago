import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface Asset {
  id: string;
  name: string;
  description: string;
}

interface AssetsContextProps {
  assets: Asset[];
  isLoading: boolean;
  error: string | null;
  loadAssets: () => void;
  deleteAsset: (id: string) => void;
}

const AssetsContext = createContext<AssetsContextProps | undefined>(undefined);

export function AssetsProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAssets = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/assets", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar ativos");
        return res.json();
      })
      .then((data) => {
        setAssets(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  const deleteAsset = (id: string) => {
    fetch(`http://localhost:3000/assets/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir ativo");
        loadAssets();
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    loadAssets();
  }, []);

  return (
    <AssetsContext.Provider value={{ assets, isLoading, error, loadAssets, deleteAsset }}>
      {children}
    </AssetsContext.Provider>
  );
}

export function useAssets() {
  const context = useContext(AssetsContext);
  if (!context) throw new Error("useAssets deve ser usado dentro de um AssetsProvider");
  return context;
}
