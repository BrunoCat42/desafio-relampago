import AssetRow from "./AssetRow";
import { useAssets } from "../context/AssetsContext";
import type { AssetTableProps } from "../interface/AssetInterface";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

export default function AssetTable({ onEdit, onViewMaintenances }: AssetTableProps) {
  const { assets } = useAssets();

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nome</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.length > 0 ? (
            assets.map((asset) => (
              <AssetRow 
                key={asset.id}
                asset={asset}
                onEdit={onEdit}
                onViewMaintenances={onViewMaintenances}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                Nenhum ativo cadastrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
