export interface Maintenance {
  id: string;
  asset_id: string;
  maintenance: string;
  description: string;
  performed_at?: string;
  next_due_date: string;    
  completed:boolean
}
export interface NewMaintenance {
  maintenance: string;
  description: string;
  performed_at?: string;
  next_due_date: string;
  completed:boolean
}