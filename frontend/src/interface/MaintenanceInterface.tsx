export interface Maintenance {
  id: string;
  asset_id: string;
  maintenance: string;
  description: string;
  performed_at: string;      // formato ISO: "2025-05-30T00:00:00.000Z"
  next_due_date?: string | null;
  created_at?: string;       // opcional, se vier do banco
  updated_at?: string;       // opcional, se houver controle de edição
}

export interface NewMaintenance {
  assetId: string;           // camelCase no front-end, corresponde ao asset_id no back
  maintenance: string;
  description: string;
  performed_at: string;      // formato "yyyy-mm-dd"
  next_due_date?: string;    // opcional
}
