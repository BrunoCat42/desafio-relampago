export interface Maintenance {
  id: string;
  asset_id: string;
  maintenance: string;
  description: string;
  performed_at?
  : string|number|Date|undefined;      
  next_due_date: string;      
  created_at?: string;
  updated_at?: string;
  completed: boolean;
}

export interface NewMaintenance {
  assetId: string;
  maintenance: string;
  description: string;
  performed_at?: string;
  next_due_date?: string;
  completed:boolean
}

