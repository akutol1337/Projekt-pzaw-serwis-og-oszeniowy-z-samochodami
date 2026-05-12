import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  Share2,
  Calendar,
  Gauge,
  Fuel,
  Zap,
  Settings2,
  Palette,
  MapPin,
  User,
  Phone,
  MessageCircle,
  AlertTriangle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useListings } from '@/contexts/ListingsContext';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/contexts/ToastContext';
import { useState } from 'react';

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getListingById, deleteListing } = useListings();
  const { user, isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  const listing = getListingById(id || '');
  const [showPhone, setShowPhone] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Ogloszenie nie znalezione</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">
          Wroc do strony glownej
        </Link>
      </div>
    );
  }

  const isOwner = isAuthenticated && user?.id === listing.userId;

  const handleDelete = () => {
    if (confirm('Czy na pewno chcesz usunac to ogloszenie?')) {
      deleteListing(listing.id);
      addToast('Ogloszenie zostalo usuniete', 'success');
      navigate('/');
    }
  };

  const galleryImages = [listing.image, listing.image, listing.image];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Ogloszenia
        </Link>
        <span>/</span>
        <span className="text-blue-600">{listing.brand}</span>
        <span>/</span>
        <span>{listing.model}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Gallery */}
          <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-[16/10]">
            <img
              src={galleryImages[currentImageIndex]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                  disabled={currentImageIndex === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(Math.min(galleryImages.length - 1, currentImageIndex + 1))}
                  disabled={currentImageIndex === galleryImages.length - 1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center disabled:opacity-30 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Title + price card */}
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-blue-600 font-medium mb-1">
                  {listing.brand} · {listing.model}
                </div>
                <h1 className="text-xl font-bold text-gray-900">{listing.title}</h1>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {listing.location}
                  </span>
                  <span>Dodano: {listing.dateAdded}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => toggleFavorite(listing.id)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(listing.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <Separator className="my-3" />

            <p className="text-2xl font-bold text-blue-600">
              {listing.price.toLocaleString('pl-PL')} zl
            </p>
          </div>

          {/* Specs */}
          <div className="bg-white rounded-xl border p-4">
            <h2 className="font-semibold text-gray-900 mb-3">Dane techniczne</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Rok produkcji</p>
                  <p className="text-sm font-medium">{listing.year}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Gauge className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Przebieg</p>
                  <p className="text-sm font-medium">{listing.mileage.toLocaleString('pl-PL')} km</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Fuel className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Rodzaj paliwa</p>
                  <p className="text-sm font-medium">{listing.fuelType}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Moc silnika</p>
                  <p className="text-sm font-medium">{listing.horsepower} KM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Settings2 className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Skrzynia biegow</p>
                  <p className="text-sm font-medium">{listing.transmission}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Palette className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Kolor</p>
                  <p className="text-sm font-medium">{listing.color}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border p-4">
            <h2 className="font-semibold text-gray-900 mb-2">Opis ogloszenia</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{listing.description}</p>
          </div>

          {/* Owner actions */}
          {isOwner && (
            <div className="bg-white rounded-xl border p-4">
              <h2 className="font-semibold text-gray-900 mb-3">Opcje wlasciciela</h2>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/edytuj-ogloszenie/${listing.id}`)}
                  className="flex items-center gap-2"
                >
                  <Pencil className="w-4 h-4" />
                  Edytuj ogloszenie
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Usun ogloszenie
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar - Seller */}
        <aside className="lg:w-80 shrink-0 space-y-4">
          {/* Price card */}
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Cena</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {listing.price.toLocaleString('pl-PL')} zl
            </p>
            <p className="text-sm text-gray-500 mt-1">Cena do negocjacji</p>
          </div>

          {/* Seller card */}
          <div className="bg-white rounded-xl border p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="font-semibold text-sm">Piotr Wisniewski</p>
                <p className="text-xs text-gray-500">Uzytkownik od 2022-11-08</p>
              </div>
            </div>

            <Button
              onClick={() => setShowPhone(true)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Phone className="w-4 h-4 mr-2" />
              {showPhone ? '+48 601 345 678' : 'Pokaz numer telefonu'}
            </Button>

            <Button variant="outline" className="w-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              Wyslij wiadomosc
            </Button>

            <div className="flex items-start gap-2 bg-amber-50 rounded-lg p-3 text-xs text-amber-800">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>Zawsze ogladaj auto osobiscie przed zakupem. Unikaj platnosci z gory.</p>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
