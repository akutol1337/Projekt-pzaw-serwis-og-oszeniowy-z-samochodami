import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useListings } from '@/contexts/ListingsContext';
import { useToast } from '@/contexts/ToastContext';
import { brands, modelsByBrand, fuelTypes, transmissions } from '@/data/mockData';

export default function EditListingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { getListingById, editListing } = useListings();
  const { addToast } = useToast();
  const listing = getListingById(id || '');

  const [form, setForm] = useState({
    title: '',
    brand: 'Wszystkie marki',
    model: 'Wszystkie modele',
    price: '',
    year: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    horsepower: '',
    color: '',
    location: '',
    description: '',
    image: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (listing) {
      setForm({
        title: listing.title,
        brand: listing.brand,
        model: listing.model,
        price: String(listing.price),
        year: String(listing.year),
        mileage: String(listing.mileage),
        fuelType: listing.fuelType,
        transmission: listing.transmission,
        horsepower: String(listing.horsepower),
        color: listing.color,
        location: listing.location,
        description: listing.description,
        image: listing.image,
      });
    }
  }, [listing]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Musisz byc zalogowany, aby edytowac ogloszenie.</p>
        <Button onClick={() => navigate('/logowanie')} className="mt-4 bg-blue-600">
          Zaloguj sie
        </Button>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Ogloszenie nie znalezione.</p>
      </div>
    );
  }

  if (user?.id !== listing.userId) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Nie masz uprawnien do edycji tego ogloszenia.</p>
      </div>
    );
  }

  const availableModels = form.brand !== 'Wszystkie marki'
    ? (modelsByBrand[form.brand] || ['Wszystkie modele'])
    : ['Wszystkie modele'];

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'brand') {
      setForm(prev => ({ ...prev, model: 'Wszystkie modele' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = 'Podaj tytul ogloszenia';
    if (form.brand === 'Wszystkie marki') newErrors.brand = 'Wybierz marke';
    if (form.model === 'Wszystkie modele') newErrors.model = 'Wybierz model';
    if (!form.price || Number(form.price) <= 0) newErrors.price = 'Podaj cene';
    if (!form.year || Number(form.year) < 1900) newErrors.year = 'Podaj rok produkcji';
    if (!form.mileage) newErrors.mileage = 'Podaj przebieg';
    if (!form.fuelType) newErrors.fuelType = 'Wybierz rodzaj paliwa';
    if (!form.transmission) newErrors.transmission = 'Wybierz skrzynie biegow';
    if (!form.location.trim()) newErrors.location = 'Podaj lokalizacje';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !id) return;

    editListing(id, {
      title: form.title,
      brand: form.brand,
      model: form.model,
      price: Number(form.price),
      year: Number(form.year),
      mileage: Number(form.mileage),
      fuelType: form.fuelType,
      transmission: form.transmission,
      horsepower: Number(form.horsepower) || 0,
      color: form.color || 'Nie podano',
      location: form.location,
      description: form.description || form.title,
      image: form.image,
    });

    addToast('Ogloszenie zostalo zaktualizowane!', 'success');
    navigate(`/ogloszenie/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Car className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Edytuj ogloszenie</h1>
        <p className="text-sm text-gray-500 mt-1">Zaktualizuj dane swojego ogloszenia</p>
      </div>

      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-title">Tytul ogloszenia</Label>
            <Input
              id="edit-title"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Marka</Label>
              <select
                value={form.brand}
                onChange={(e) => updateField('brand', e.target.value)}
                className={`w-full h-10 rounded-md border px-3 text-sm ${errors.brand ? 'border-red-500' : 'border-input'}`}
              >
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              {errors.brand && <p className="text-xs text-red-500 mt-1">{errors.brand}</p>}
            </div>
            <div>
              <Label>Model</Label>
              <select
                value={form.model}
                onChange={(e) => updateField('model', e.target.value)}
                className={`w-full h-10 rounded-md border px-3 text-sm ${errors.model ? 'border-red-500' : 'border-input'}`}
              >
                {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              {errors.model && <p className="text-xs text-red-500 mt-1">{errors.model}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-price">Cena (zl)</Label>
              <Input
                id="edit-price"
                type="number"
                value={form.price}
                onChange={(e) => updateField('price', e.target.value)}
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>
            <div>
              <Label htmlFor="edit-year">Rok produkcji</Label>
              <Input
                id="edit-year"
                type="number"
                value={form.year}
                onChange={(e) => updateField('year', e.target.value)}
                className={errors.year ? 'border-red-500' : ''}
              />
              {errors.year && <p className="text-xs text-red-500 mt-1">{errors.year}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-mileage">Przebieg (km)</Label>
              <Input
                id="edit-mileage"
                type="number"
                value={form.mileage}
                onChange={(e) => updateField('mileage', e.target.value)}
                className={errors.mileage ? 'border-red-500' : ''}
              />
              {errors.mileage && <p className="text-xs text-red-500 mt-1">{errors.mileage}</p>}
            </div>
            <div>
              <Label htmlFor="edit-hp">Moc silnika (KM)</Label>
              <Input
                id="edit-hp"
                type="number"
                value={form.horsepower}
                onChange={(e) => updateField('horsepower', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Rodzaj paliwa</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {fuelTypes.map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => updateField('fuelType', f)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                      form.fuelType === f
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              {errors.fuelType && <p className="text-xs text-red-500 mt-1">{errors.fuelType}</p>}
            </div>
            <div>
              <Label>Skrzynia biegow</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {transmissions.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => updateField('transmission', t)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                      form.transmission === t
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {errors.transmission && <p className="text-xs text-red-500 mt-1">{errors.transmission}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-color">Kolor</Label>
              <Input
                id="edit-color"
                value={form.color}
                onChange={(e) => updateField('color', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="edit-location">Lokalizacja</Label>
              <Input
                id="edit-location"
                value={form.location}
                onChange={(e) => updateField('location', e.target.value)}
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="edit-desc">Opis ogloszenia</Label>
            <Textarea
              id="edit-desc"
              rows={4}
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
            />
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Kliknij, aby zmienic zdjecie</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG do 10MB</p>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-base">
            Zapisz zmiany
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
