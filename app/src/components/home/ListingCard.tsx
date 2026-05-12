import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Calendar, Gauge, Fuel, MapPin } from 'lucide-react';
import type { Listing } from '@/types';
import { useFavorites } from '@/contexts/FavoritesContext';

interface Props {
  listing: Listing;
  index: number;
}

export default function ListingCard({ listing, index }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(listing.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link to={`/ogloszenie/${listing.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Fuel badge */}
          <span className="absolute bottom-2 left-2 px-2 py-0.5 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-gray-700">
            {listing.fuelType}
          </span>
          {/* Featured badge */}
          {listing.isFeatured && (
            <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-blue-600 text-white rounded-full">
              Wyroznione
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
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
            <Heart
              className={`w-5 h-5 transition-colors ${
                fav ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
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
  );
}
