export interface Tree {
  id: string;
  commonName: string;
  botanicalName: string;
  iNaturalistUrl: string;
  category: string;
  description: string;
  plantingCareInfo: string;
  companionPlants: string[];
  complementaryTrees: string[];
  sku: string;
  size: string;
  price: number;
  quantityInStock: number;
  image?: string;
}

export interface TreeFilter {
  searchTerm: string;
  category: string;
  sortBy: 'name' | 'price' | 'availability';
  sortOrder: 'asc' | 'desc';
}

export interface ClientRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  requestedTrees: string[];
  status: 'pending' | 'reviewed' | 'completed';
  createdAt: string;
}