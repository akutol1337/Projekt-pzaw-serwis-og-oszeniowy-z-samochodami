export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  joinDate: string;
}

export interface Listing {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  horsepower: number;
  color: string;
  location: string;
  image: string;
  brand: string;
  model: string;
  description: string;
  userId: string;
  isFeatured: boolean;
  dateAdded: string;
}

export interface Filters {
  brand: string;
  model: string;
  priceMin: number | '';
  priceMax: number | '';
  yearFrom: number | '';
  yearTo: number | '';
  fuelType: string;
  transmission: string;
  searchQuery: string;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'mileage-asc' | 'year-desc';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
