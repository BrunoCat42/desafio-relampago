export interface Maintenance {
  id: string;
  asset_id: string;
  maintenance: string;
  description: string;
  performed_at?: string;      // Torna opcional
  next_due_date: string;      // Torna obrigatório
  created_at?: string;
  updated_at?: string;
}

export interface NewMaintenance {
  assetId: string;
  maintenance: string;
  description: string;
  performed_at?: string;      // Torna opcional
  next_due_date: string;      // Torna obrigatório
}