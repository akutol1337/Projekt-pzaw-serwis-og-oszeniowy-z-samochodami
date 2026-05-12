import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Search, Plus, User, LogOut, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useListings } from '@/contexts/ListingsContext';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { setFilters } = useListings();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ searchQuery });
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">AutoMarket</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Szukaj: marka, model, słowo kluczowe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-24 h-10"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 h-8"
              >
                <Search className="w-4 h-4 mr-1" />
                Szukaj
              </Button>
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-2 shrink-0">
            {isAuthenticated ? (
              <>
                <Link to="/ulubione" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                  {favorites.size > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center">
                      {favorites.size}
                    </span>
                  )}
                </Link>

                <Button
                  onClick={() => navigate('/dodaj-ogloszenie')}
                  className="hidden sm:flex bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Dodaj ogloszenie
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <User className="w-4 h-4" />
                      <span className="hidden lg:inline">{user?.name}</span>
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate('/profil')}>
                      <User className="w-4 h-4 mr-2" />
                      Profil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/ulubione')}>
                      <Heart className="w-4 h-4 mr-2" />
                      Ulubione ({favorites.size})
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Wyloguj sie
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/logowanie">
                  <Button variant="ghost" size="sm">Zaloguj sie</Button>
                </Link>
                <Link to="/rejestracja">
                  <Button variant="outline" size="sm">Zarejestruj sie</Button>
                </Link>
                <Button
                  onClick={() => navigate('/dodaj-ogloszenie')}
                  className="hidden sm:flex bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Dodaj ogloszenie
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
