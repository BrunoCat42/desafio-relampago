export interface Asset {
  id: string;
  name: string;
  description: string;
}

export interface AssetRowProps {
  asset: Asset;
  onEdit: (id: string) => void;
  onViewMaintenances: (id: string) => void;
}

export interface NewAsset {
  name: string;
  description: string
}

export interface AssetsContextProps {
  assets: Asset[];
  isLoading: boolean;
  error: string | null;
  loadAssets: () => void;
  deleteAsset: (id: string) => void;
  createAsset: (data: NewAsset) => void;
  updateAsset: (data: Asset) => void;
}


export interface AssetTableProps {
  onEdit: (id: string) => void;
  onViewMaintenances: (id: string) => void;
}