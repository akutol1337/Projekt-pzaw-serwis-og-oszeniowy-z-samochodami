import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useListings } from '@/contexts/ListingsContext';
import { quickBrands } from '@/data/mockData';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const { setFilters } = useListings();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ searchQuery: query });
    navigate('/');
  };

  const handleBrandClick = (brand: string) => {
    setFilters({ brand, searchQuery: '' });
  };

  return (
    <section className="bg-blue-600 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Znajdz swoje wymarzone auto
          </h1>
          <p className="text-blue-100 text-sm md:text-base mb-6">
            Ponad 12 ogloszen od sprawdzonych sprzedawcow
          </p>
        </motion.div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
          <div className="flex bg-white rounded-xl overflow-hidden shadow-lg">
            <Input
              type="text"
              placeholder="Wpisz marke, model lub slowo kluczowe..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 h-12 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" className="bg-blue-700 hover:bg-blue-800 rounded-none px-6 h-12">
              <Search className="w-4 h-4 mr-2" />
              Szukaj
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-2">
          {quickBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleBrandClick(brand)}
              className="px-4 py-1.5 bg-blue-500/40 hover:bg-blue-500/60 text-white text-sm rounded-full transition-colors"
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
