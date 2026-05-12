import { LayoutGrid, List, ArrowUpDown } from 'lucide-react';
import { useListings } from '@/contexts/ListingsContext';
import type { SortOption } from '@/types';
import MobileFiltersDrawer from './MobileFiltersDrawer';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Najnowsze' },
  { value: 'price-asc', label: 'Cena: od najnizszej' },
  { value: 'price-desc', label: 'Cena: od najwyzszej' },
  { value: 'mileage-asc', label: 'Przebieg: rosnaco' },
  { value: 'year-desc', label: 'Rok: najnowszy' },
];

export default function ListingsToolbar() {
  const { sortBy, setSortBy } = useListings();

  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <MobileFiltersDrawer />

      <span className="text-sm text-gray-500 hidden sm:block">12 ogloszen</span>

      <div className="flex items-center gap-2 ml-auto">
        <div className="flex items-center gap-1">
          <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-8 rounded-md border border-input bg-background px-2 text-sm"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="hidden sm:flex items-center border rounded-md overflow-hidden">
          <button className="p-1.5 bg-blue-600 text-white">
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button className="p-1.5 bg-white text-gray-400 hover:text-gray-600">
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
