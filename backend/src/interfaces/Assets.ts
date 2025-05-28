export interface Asset {
  id: string;
  name: string;
  description?: string;
  user_id: string;
  created_at: string;
}

export interface NewAsset {
  name: string;
  description?: string;
}
