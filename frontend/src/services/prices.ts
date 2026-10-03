import { apiRequest } from './api';

export type Price = {
  id: number;
  product_id: number;
  submitter_id: number | null;
  location_id: number | null;
  amount: string;
  currency: string;
  photo_path: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  product?: { id: number; name: string; category: string | null; brand: string | null };
  location?: { id: number; city: string; area: string | null };
};

export type Product = {
  id: number;
  name: string;
  category: string | null;
  brand: string | null;
};

export type Location = {
  id: number;
  city: string;
  area: string | null;
};

export function fetchPrices(): Promise<Price[]> {
  return apiRequest<Price[]>('/prices');
}

export function fetchProducts(): Promise<Product[]> {
  return apiRequest<Product[]>('/products');
}

export function fetchLocations(): Promise<Location[]> {
  return apiRequest<Location[]>('/locations');
}

export function submitPrice(payload: {
  product_name: string;
  category?: string;
  brand?: string;
  city: string;
  area?: string;
  amount: number;
  currency?: string;
}): Promise<Price> {
  return apiRequest<Price>('/prices', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}



export type VoteCounts = {
  vote_id: number;
  price_id: number;
  up: number;
  down: number;
  flag: number;
};

export function votePrice(
  priceId: number,
  voteType: 'up' | 'down' | 'flag',
): Promise<VoteCounts> {
  return apiRequest<VoteCounts>(`/prices/${priceId}/vote`, {
    method: 'POST',
    body: JSON.stringify({ vote_type: voteType }),
  });
}