import AssetRow from "./AssetRow";
import { useAssets } from "../context/AssetsContext";

interface AssetTableProps {
  onEdit: (id: string) => void;
  onViewMaintenances: (id: string) => void;
}

export default function AssetTable({ onEdit, onViewMaintenances }: AssetTableProps) {
  const { assets } = useAssets();

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => (
          <AssetRow
            key={asset.id}
            asset={asset}
            onEdit={onEdit}
            onViewMaintenances={onViewMaintenances}
          />
        ))}
      </tbody>
    </table>
  );
}
