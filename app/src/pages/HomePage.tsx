import HeroSection from '@/components/home/HeroSection';
import FiltersSidebar from '@/components/home/FiltersSidebar';
import ListingsToolbar from '@/components/home/ListingsToolbar';
import ListingsGrid from '@/components/home/ListingsGrid';
import Pagination from '@/components/home/Pagination';

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar - desktop only */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20">
              <FiltersSidebar />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <ListingsToolbar />
            <ListingsGrid />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
