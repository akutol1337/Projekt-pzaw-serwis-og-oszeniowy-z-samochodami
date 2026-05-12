export default function Footer() {
  return (
    <footer className="bg-white border-t py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <span>© 2026 AutoMarket. Wszelkie prawa zastrzezone.</span>
          <div className="flex gap-4">
            <span className="hover:text-gray-700 cursor-pointer">Regulamin</span>
            <span className="hover:text-gray-700 cursor-pointer">Polityka prywatnosci</span>
            <span className="hover:text-gray-700 cursor-pointer">Pomoc</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
