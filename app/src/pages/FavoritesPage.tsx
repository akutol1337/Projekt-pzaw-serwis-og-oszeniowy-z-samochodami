import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Calendar, Gauge, Fuel, MapPin } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useListings } from '@/contexts/ListingsContext';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { listings } = useListings();
  const navigate = useNavigate();

  const favoriteListings = listings.filter(l => favorites.has(l.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Ulubione ogloszenia ({favoriteListings.length})
      </h1>

      {favoriteListings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium text-gray-500">Brak ulubionych ogloszen</p>
          <p className="text-sm text-gray-400 mt-1">Kliknij serduszko przy ogloszeniu, aby dodac je do ulubionych</p>
          <Button onClick={() => navigate('/')} className="mt-6 bg-blue-600">
            Przegladaj ogloszenia
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {favoriteListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link to={`/ogloszenie/${listing.id}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-gray-700">
                    {listing.fuelType}
                  </span>
                  {listing.isFeatured && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-blue-600 text-white rounded-full">
                      Wyroznione
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <Link to={`/ogloszenie/${listing.id}`} className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {listing.title}
                    </h3>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(listing.id);
                    }}
                    className="shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
                </div>

                <p className="text-lg font-bold text-blue-600 mt-1">
                  {listing.price.toLocaleString('pl-PL')} zl
                </p>

                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {listing.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Gauge className="w-3 h-3" />
                    {listing.mileage.toLocaleString('pl-PL')} km
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="w-3 h-3" />
                    {listing.horsepower} KM
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {listing.location}
                  </span>
                  <span>{listing.dateAdded}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
