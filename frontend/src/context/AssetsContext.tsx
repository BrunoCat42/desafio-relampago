import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Asset, NewAsset, AssetsContextProps } from "../interface/AssetInterface";

const AssetsContext = createContext<AssetsContextProps | undefined>(undefined);

export function AssetsProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAssets = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/api/assets", {
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
    fetch(`http://localhost:3000/api/assets/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir ativo");
        loadAssets();
      })
      .catch((err) => setError(err.message));
  };

const createAsset = (data: NewAsset) => {
  fetch("http://localhost:3000/api/assets", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao criar ativo");
      loadAssets();
    })
    .catch((err) => setError(err.message));
};

const updateAsset = (data: Asset) => {
  fetch(`http://localhost:3000/api/assets/${data.id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao atualizar ativo");
      loadAssets();
    })
    .catch((err) => setError(err.message));
};

  useEffect(() => {
    loadAssets();
  }, []);

  return (
    <AssetsContext.Provider
      value={{
        assets,
        isLoading,
        error,
        loadAssets,
        deleteAsset,
        createAsset,
        updateAsset,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
}

export function useAssets() {
  const context = useContext(AssetsContext);
  if (!context)
    throw new Error("useAssets deve ser usado dentro de um AssetsProvider");
  return context;
}
