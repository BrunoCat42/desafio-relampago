import { useAssets } from "../context/AssetsContext";
import type { AssetRowProps } from "../interface/AssetInterface";
import { useState } from "react";
import MaintenanceModal from "./MaintenanceModal";
import type { NewMaintenance } from "../interface/MaintenanceInterface";

export default function AssetRow({ asset, onEdit }: AssetRowProps) {
  const { deleteAsset } = useAssets();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (data: NewMaintenance) => {
    try {
      await fetch("http://localhost:3000/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...data, assetId: asset.id }),
      });
    } catch (err) {
      alert("Erro ao salvar manutenção");
    }
  };

  return (
    <>
      <tr>
        <td>{asset.name}</td>
        <td>{asset.description}</td>
        <td>
          <button onClick={() => setIsModalOpen(true)}>Adicionar Manutenção</button>
          <button onClick={() => onEdit(asset.id)}>Editar</button>
          <button onClick={() => deleteAsset(asset.id)}>Excluir</button>
        </td>
      </tr>

      <MaintenanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        assetId={asset.id}
      />
    </>
  );
}
