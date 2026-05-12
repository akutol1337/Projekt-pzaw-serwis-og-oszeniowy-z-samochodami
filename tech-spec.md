# AutoMarket – Specyfikacja Techniczna

## Stack technologiczny

| Warstwa | Biblioteka |
|---------|-----------|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| Styling | Tailwind CSS 3.4 |
| Komponenty UI | shadcn/ui (zainstalowane: button, card, input, select, dialog, badge, separator, dropdown-menu, accordion, label, separator, toast) |
| Ikony | Lucide React |
| Routing | React Router DOM v6 |
| Animacje | Framer Motion |
| Stan globalny | React Context API (useReducer) |

## Zależności npm

```
react-router-dom
framer-motion
lucide-react
```

shadcn/ui komponenty: button, card, input, select, dialog, badge, separator, dropdown-menu, accordion, label, toast

## Architektura stanu

### Warstwa danych (React Context)

| Kontekst | Zakres | Typ danych |
|----------|--------|------------|
| `AuthContext` | Stan logowania, dane użytkownika, operacje login/logout/register | `{ user: User\|null, isAuthenticated, login(), logout(), register() }` |
| `ListingsContext` | Wszystkie ogłoszenia, operacje CRUD, filtrowanie, sortowanie, paginacja | `{ listings[], filteredListings[], filters, sortBy, pagination, addListing(), editListing(), deleteListing(), toggleFavorite(), setFilters() }` |
| `FavoritesContext` | Lista ID ulubionych ogłoszeń (localStorage) | `{ favorites: Set<string>, toggleFavorite(), isFavorite() }` |
| `ToastContext` | System powiadomień toast | `{ toasts[], addToast(), removeToast() }` |

### Typy danych (TypeScript interfaces)

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  joinDate: string;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  horsepower: number;
  color: string;
  location: string;
  image: string;
  brand: string;
  model: string;
  description: string;
  userId: string;
  isFeatured: boolean;
  dateAdded: string;
}

interface Filters {
  brand: string;
  model: string;
  priceMin: number | '';
  priceMax: number | '';
  yearFrom: number | '';
  yearTo: number | '';
  fuelType: string;
  transmission: string;
  searchQuery: string;
}
```

## Routing

| Ścieżka | Komponent | Opis |
|---------|-----------|------|
| `/` | `HomePage` | Strona główna – hero + lista ogłoszeń z filtrami |
| `/ogloszenie/:id` | `ListingDetailPage` | Szczegóły ogłoszenia |
| `/logowanie` | `LoginPage` | Formularz logowania |
| `/rejestracja` | `RegisterPage` | Formularz rejestracji |
| `/profil` | `ProfilePage` | Panel użytkownika – jego ogłoszenia |
| `/ulubione` | `FavoritesPage` | Lista ulubionych ogłoszeń |
| `/dodaj-ogloszenie` | `AddListingPage` | Formularz dodawania ogłoszenia |
| `/edytuj-ogloszenie/:id` | `EditListingPage` | Formularz edycji ogłoszenia |

## Struktura komponentów

### Layout (shared)
- `AppLayout` – główny wrapper z Header + Outlet + Footer
- `Header` – logo, pasek wyszukiwania, przyciski auth, "Dodaj ogłoszenie"
- `Footer` – copyright, linki

### Strona główna (`HomePage`)
- `HeroSection` – gradient niebieski, nagłówek, podtytuł, search bar, marki skrótowe
- `FiltersSidebar` – panel boczny z filtrami (accordion sections)
- `MobileFiltersDrawer` – wysuwany panel filtrów na mobile
- `ListingsGrid` – siatka kart ogłoszeń
- `ListingCard` – pojedyncza karta ogłoszenia
- `ListingsToolbar` – sortowanie + toggle widoku grid/list
- `Pagination` – stronicowanie

### Szczegóły ogłoszenia (`ListingDetailPage`)
- `ListingGallery` – duże zdjęcie / galeria
- `ListingInfo` – tytuł, cena, lokalizacja, data
- `ListingSpecs` – dane techniczne (grid 3×2)
- `ListingDescription` – opis ogłoszenia
- `SellerCard` – dane sprzedającego + przyciski kontaktu
- `ListingActions` – edycja/usuwanie (widoczne tylko dla właściciela)

### System użytkownika
- `LoginPage` – formularz logowania (demo: jan@example.com / haslo123)
- `RegisterPage` – formularz rejestracji z paskiem siły hasła
- `ProfilePage` – lista ogłoszeń użytkownika z opcjami edycji/usuwania

### Ulubione
- `FavoritesPage` – lista zapisanych ogłoszeń (korzysta z FavoritesContext)

### Powiadomienia
- `ToastContainer` – kontener renderujący aktywne toasty
- `Toast` – pojedynczy toast

## Dane mockowe

12 pełnych ogłoszeń samochodowych z wszystkimi polami (id, tytuł, cena, rok, przebieg, paliwo, skrzynia, moc, kolor, lokalizacja, zdjęcie, marka, model, opis, userId, featured, data).

2 użytkowników mockowych (admin i zwykły).

## Logika biznesowa

### Autentykacja
- Demo login: jan@example.com / haslo123 → zapisuje user do AuthContext + localStorage
- Walidacja formularzy na poziomie klienta
- Rejestracja: walidacja email, siła hasła (1-4 segmenty), zgodność haseł
- Wylogowanie: czyści AuthContext + localStorage

### Filtrowanie
- Wszystkie filtry łączone AND
- Filtrowanie po marce → dynamiczna lista modeli
- Filtrowanie po cenie (min-max, inclusive)
- Filtrowanie po roku produkcji (dropdown z przedziałami)
- Filtrowanie po paliwie ( Benzyna, Diesel, Hybryda, Elektryczny, LPG)
- Filtrowanie po skrzyni biegów (Automatyczna, Manualna)
- Search bar – dopasowanie po marce, modelu, tytule

### Sortowanie
- Najnowsze, Cena: od najniższej, Cena: od najwyższej, Przebieg: rosnąco, Rok: najnowszy

### Paginacja
- 6 ogłoszeń na stronę
- Strony: Poprzednia / numery / Następna

### Ulubione
- Zapisywanie ID ogłoszeń w localStorage
- Toggle serduszka na karcie i stronie szczegółów

## Animacje (Framer Motion)

| Element | Animacja | Parametry |
|---------|----------|-----------|
| Listing cards (grid) | Fade-in + slide-up | `initial={{ opacity: 0, y: 20 }}` `animate={{ opacity: 1, y: 0 }}` stagger 0.05s |
| Strona szczegółów | Fade-in | `initial={{ opacity: 0 }}` `animate={{ opacity: 1 }}` duration 0.3s |
| Mobile filters drawer | Slide-in from left | `x: -100% → 0` duration 0.3s, overlay fade |
| Toast notifications | Slide-in from top-right + auto-dismiss | `x: 100% → 0`, duration 0.3s, auto-dismiss 3s |
| Hero section | Fade-in on load | opacity 0→1, duration 0.5s |
| Pagination change | Cards re-animate | key change triggers stagger animation |

## Responsywność (Tailwind breakpoints)

| Breakpoint | Zachowanie |
|------------|-----------|
| `sm:` (640px) | Pojedyncza kolumna kart |
| `md:` (768px) | 2 kolumny kart, filtry jako drawer |
| `lg:` (1024px) | Sidebar filtrów widoczny, 2 kolumny |
| `xl:` (1280px) | 3 kolumny kart |

## Decyzje projektowe

1. **Context API zamiast Zustand/Redux** – aplikacja ma umiarkowaną złożoność stanu, Context API wystarczy bez dodatkowej biblioteki
2. **localStorage zamiast backendu** – wszystkie dane (użytkownicy, ogłoszenia, ulubione) przechowywane w localStorage; mockowe dane inicjalizowane przy pierwszym załadowaniu
3. **Framer Motion zamiast GSAP** – prostsze animacje UI (fade, slide), Framer Motion lepiej integruje się z React
4. **shadcn/ui jako baza** – spójny design system, łatwa customizacja przez Tailwind
5. **React Router v6** – deklaratywny routing, obsługa parametrów URL dla ogłoszeń
