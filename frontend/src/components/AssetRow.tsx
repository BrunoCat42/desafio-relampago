import { useAssets } from "../context/AssetsContext";
import type { AssetRowProps } from "../interface/AssetInterface";

export default function AssetRow({ asset, onEdit, onViewMaintenances }: AssetRowProps) {
  const { deleteAsset } = useAssets();

  return (
    <tr>
      <td>{asset.name}</td>
      <td>{asset.description}</td>
      <td>
        <button onClick={() => onViewMaintenances(asset.id)}>Ver Manutenções</button>
        <button onClick={() => onEdit(asset.id)}>Editar</button>
        <button onClick={() => deleteAsset(asset.id)}>Excluir</button>
      </td>
    </tr>
  );
}
