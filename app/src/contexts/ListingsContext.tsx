import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';
import type { Listing, Filters, SortOption } from '@/types';
import { listings as mockListings } from '@/data/mockData';

interface ListingsContextType {
  listings: Listing[];
  filteredListings: Listing[];
  filters: Filters;
  sortBy: SortOption;
  currentPage: number;
  totalPages: number;
  setFilters: (filters: Partial<Filters>) => void;
  setSortBy: (sort: SortOption) => void;
  setCurrentPage: (page: number) => void;
  addListing: (listing: Omit<Listing, 'id' | 'dateAdded'>) => void;
  editListing: (id: string, listing: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
  getListingById: (id: string) => Listing | undefined;
  getUserListings: (userId: string) => Listing[];
}

const defaultFilters: Filters = {
  brand: 'Wszystkie marki',
  model: 'Wszystkie modele',
  priceMin: '',
  priceMax: '',
  yearFrom: '',
  yearTo: '',
  fuelType: '',
  transmission: '',
  searchQuery: '',
};

const ITEMS_PER_PAGE = 6;

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>(() => {
    const stored = localStorage.getItem('automarket_listings');
    return stored ? JSON.parse(stored) : mockListings;
  });
  const [filters, setFiltersState] = useState<Filters>(defaultFilters);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const setFilters = useCallback((newFilters: Partial<Filters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  }, []);

  const filtered = useMemo(() => {
    let result = [...listings];

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.brand.toLowerCase().includes(q) ||
        l.model.toLowerCase().includes(q)
      );
    }

    if (filters.brand && filters.brand !== 'Wszystkie marki') {
      result = result.filter(l => l.brand === filters.brand);
    }

    if (filters.model && filters.model !== 'Wszystkie modele') {
      result = result.filter(l => l.model === filters.model);
    }

    if (filters.priceMin !== '') {
      result = result.filter(l => l.price >= Number(filters.priceMin));
    }

    if (filters.priceMax !== '') {
      result = result.filter(l => l.price <= Number(filters.priceMax));
    }

    if (filters.yearFrom !== '') {
      result = result.filter(l => l.year >= Number(filters.yearFrom));
    }

    if (filters.yearTo !== '') {
      result = result.filter(l => l.year <= Number(filters.yearTo));
    }

    if (filters.fuelType) {
      result = result.filter(l => l.fuelType === filters.fuelType);
    }

    if (filters.transmission) {
      result = result.filter(l => l.transmission === filters.transmission);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mileage-asc':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'year-desc':
        result.sort((a, b) => b.year - a.year);
        break;
    }

    return result;
  }, [listings, filters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const addListing = useCallback((listing: Omit<Listing, 'id' | 'dateAdded'>) => {
    const newListing: Listing = {
      ...listing,
      id: `${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setListings(prev => {
      const updated = [newListing, ...prev];
      localStorage.setItem('automarket_listings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const editListing = useCallback((id: string, updates: Partial<Listing>) => {
    setListings(prev => {
      const updated = prev.map(l => l.id === id ? { ...l, ...updates } : l);
      localStorage.setItem('automarket_listings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteListing = useCallback((id: string) => {
    setListings(prev => {
      const updated = prev.filter(l => l.id !== id);
      localStorage.setItem('automarket_listings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getListingById = useCallback((id: string) => {
    return listings.find(l => l.id === id);
  }, [listings]);

  const getUserListings = useCallback((userId: string) => {
    return listings.filter(l => l.userId === userId);
  }, [listings]);

  return (
    <ListingsContext.Provider value={{
      listings,
      filteredListings: paginated,
      filters,
      sortBy,
      currentPage,
      totalPages,
      setFilters,
      setSortBy,
      setCurrentPage,
      addListing,
      editListing,
      deleteListing,
      getListingById,
      getUserListings,
    }}>
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const context = useContext(ListingsContext);
  if (!context) throw new Error('useListings must be used within ListingsProvider');
  return context;
}
