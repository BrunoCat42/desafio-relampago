export interface Maintenance {
  id: string;
  asset_id: string;
  maintenance: string;
  description: string;
  performed_at: string;
  next_due_date?: string;
}

export interface NewMaintenance {
  maintenance: string;
  description: string;
  performed_at: string;
  next_due_date?: string;
}
