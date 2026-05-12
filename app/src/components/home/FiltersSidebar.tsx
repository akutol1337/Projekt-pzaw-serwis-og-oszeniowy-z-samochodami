import { useListings } from '@/contexts/ListingsContext';
import { brands, modelsByBrand, fuelTypes, transmissions } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SlidersHorizontal } from 'lucide-react';

export default function FiltersSidebar() {
  const { filters, setFilters, listings } = useListings();

  const availableModels = filters.brand ? (modelsByBrand[filters.brand] || ['Wszystkie modele']) : ['Wszystkie modele'];

  const yearOptions = Array.from({ length: 17 }, (_, i) => 2010 + i);

  return (
    <div className="bg-white rounded-xl border p-4 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold flex items-center gap-2 text-sm">
          <SlidersHorizontal className="w-4 h-4" />
          Filtry
        </h3>
        <span className="text-xs text-gray-500">{listings.length} wynikow</span>
      </div>

      <Accordion type="multiple" defaultValue={['brand', 'price', 'year', 'fuel']} className="space-y-1">
        <AccordionItem value="brand" className="border-0">
          <AccordionTrigger className="text-sm py-2 hover:no-underline">Marka</AccordionTrigger>
          <AccordionContent>
            <select
              value={filters.brand}
              onChange={(e) => {
                setFilters({ brand: e.target.value, model: 'Wszystkie modele' });
              }}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </AccordionContent>
        </AccordionItem>

        {filters.brand !== 'Wszystkie marki' && (
          <AccordionItem value="model" className="border-0">
            <AccordionTrigger className="text-sm py-2 hover:no-underline">Model</AccordionTrigger>
            <AccordionContent>
              <select
                value={filters.model}
                onChange={(e) => setFilters({ model: e.target.value })}
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
              >
                {availableModels.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="price" className="border-0">
          <AccordionTrigger className="text-sm py-2 hover:no-underline">Cena (PLN)</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label className="text-xs text-gray-500">Od</Label>
                <Input
                  type="number"
                  placeholder="Od"
                  value={filters.priceMin}
                  onChange={(e) => setFilters({ priceMin: e.target.value === '' ? '' : Number(e.target.value) })}
                  className="h-9"
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-gray-500">Do</Label>
                <Input
                  type="number"
                  placeholder="Do"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({ priceMax: e.target.value === '' ? '' : Number(e.target.value) })}
                  className="h-9"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="year" className="border-0">
          <AccordionTrigger className="text-sm py-2 hover:no-underline">Rok produkcji</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label className="text-xs text-gray-500">Od roku</Label>
                <select
                  value={filters.yearFrom}
                  onChange={(e) => setFilters({ yearFrom: e.target.value === '' ? '' : Number(e.target.value) })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">Wybierz</option>
                  {yearOptions.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <Label className="text-xs text-gray-500">Do roku</Label>
                <select
                  value={filters.yearTo}
                  onChange={(e) => setFilters({ yearTo: e.target.value === '' ? '' : Number(e.target.value) })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">Wybierz</option>
                  {yearOptions.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fuel" className="border-0">
          <AccordionTrigger className="text-sm py-2 hover:no-underline">Rodzaj paliwa</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {fuelTypes.map(fuel => (
                <button
                  key={fuel}
                  onClick={() => setFilters({ fuelType: filters.fuelType === fuel ? '' : fuel })}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                    filters.fuelType === fuel
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {fuel}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="transmission" className="border-0">
          <AccordionTrigger className="text-sm py-2 hover:no-underline">Skrzynia biegow</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {transmissions.map(t => (
                <button
                  key={t}
                  onClick={() => setFilters({ transmission: filters.transmission === t ? '' : t })}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                    filters.transmission === t
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <button
        onClick={() => setFilters({
          brand: 'Wszystkie marki',
          model: 'Wszystkie modele',
          priceMin: '',
          priceMax: '',
          yearFrom: '',
          yearTo: '',
          fuelType: '',
          transmission: '',
          searchQuery: '',
        })}
        className="w-full text-sm text-blue-600 hover:text-blue-700 py-2 text-center transition-colors"
      >
        Wyczysc filtry
      </button>
    </div>
  );
}
