import { Routes, Route } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import HomePage from '@/pages/HomePage'
import ListingDetailPage from '@/pages/ListingDetailPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import ProfilePage from '@/pages/ProfilePage'
import FavoritesPage from '@/pages/FavoritesPage'
import AddListingPage from '@/pages/AddListingPage'
import EditListingPage from '@/pages/EditListingPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ogloszenie/:id" element={<ListingDetailPage />} />
        <Route path="/logowanie" element={<LoginPage />} />
        <Route path="/rejestracja" element={<RegisterPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/ulubione" element={<FavoritesPage />} />
        <Route path="/dodaj-ogloszenie" element={<AddListingPage />} />
        <Route path="/edytuj-ogloszenie/:id" element={<EditListingPage />} />
      </Route>
    </Routes>
  )
}
