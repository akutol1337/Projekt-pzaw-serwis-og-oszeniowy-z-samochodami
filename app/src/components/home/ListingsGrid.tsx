import { motion, AnimatePresence } from 'framer-motion';
import { useListings } from '@/contexts/ListingsContext';
import ListingCard from './ListingCard';

export default function ListingsGrid() {
  const { filteredListings, currentPage } = useListings();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className="contents"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filteredListings.map((listing, index) => (
            <ListingCard key={listing.id} listing={listing} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredListings.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-500">
          <p className="text-lg font-medium">Nie znaleziono ogloszen</p>
          <p className="text-sm mt-1">Sprobuj zmienic kryteria wyszukiwania</p>
        </div>
      )}
    </div>
  );
}
