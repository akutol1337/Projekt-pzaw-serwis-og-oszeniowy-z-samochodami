import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, Pencil, Trash2, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useListings } from '@/contexts/ListingsContext';
import { useToast } from '@/contexts/ToastContext';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const { getUserListings, deleteListing } = useListings();
  const { addToast } = useToast();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Musisz byc zalogowany, aby zobaczyc profil.</p>
        <Button onClick={() => navigate('/logowanie')} className="mt-4 bg-blue-600">
          Zaloguj sie
        </Button>
      </div>
    );
  }

  const userListings = getUserListings(user.id);

  const handleDelete = (id: string) => {
    if (confirm('Czy na pewno chcesz usunac to ogloszenie?')) {
      deleteListing(id);
      addToast('Ogloszenie zostalo usuniete', 'success');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Profile header */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
              <Calendar className="w-3 h-3" />
              Uzytkownik od {user.joinDate}
            </div>
          </div>
        </div>
      </div>

      {/* User listings */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Moje ogloszenia ({userListings.length})
        </h2>

        {userListings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Car className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">Nie masz jeszcze ogloszen</p>
            <Button
              onClick={() => navigate('/dodaj-ogloszenie')}
              className="mt-4 bg-blue-600"
              size="sm"
            >
              Dodaj ogloszenie
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {userListings.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center gap-4 p-3 rounded-lg border hover:shadow-sm transition-shadow"
              >
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-20 h-14 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{listing.title}</h3>
                  <p className="text-blue-600 font-semibold text-sm">
                    {listing.price.toLocaleString('pl-PL')} zl
                  </p>
                  <p className="text-xs text-gray-400">{listing.dateAdded}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/edytuj-ogloszenie/${listing.id}`)}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(listing.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
