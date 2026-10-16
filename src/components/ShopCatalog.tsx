import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES, MOODS, FRAGRANCE_FAMILIES } from '../data/perfumes';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { FragranceFamily, Mood, Intensity, Occasion } from '../types';

export const ShopCatalog: React.FC = () => {
  const { selectedMoodFilter, setSelectedMoodFilter } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [selectedMood, setSelectedMood] = useState<string>(selectedMoodFilter || 'All');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(320);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'alpha-asc' | 'alpha-desc'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync external mood selection (e.g. from homepage "Explore by Mood" cards)
  React.useEffect(() => {
    if (selectedMoodFilter) {
      setSelectedMood(selectedMoodFilter);
      setSelectedMoodFilter(null);
    }
  }, [selectedMoodFilter, setSelectedMoodFilter]);

  const occasions: Occasion[] = [
    'Everyday Signature',
    'Evening & Gala',
    'Intimate & Sensual',
    'Summer & Sunlit',
    'Autumn & Winter Fireside',
    'Rainy Days & Reflection'
  ];

  const intensities: Intensity[] = ['Subtle', 'Moderate', 'Intense'];

  // Count active filters
  const activeFiltersCount =
    (selectedFamily !== 'All' ? 1 : 0) +
    (selectedMood !== 'All' ? 1 : 0) +
    (selectedIntensity !== 'All' ? 1 : 0) +
    (selectedOccasion !== 'All' ? 1 : 0) +
    (maxPrice < 320 ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFamily('All');
    setSelectedMood('All');
    setSelectedIntensity('All');
    setSelectedOccasion('All');
    setMaxPrice(320);
    setSortBy('featured');
  };

  // Filtered and sorted perfumes
  const filteredPerfumes = useMemo(() => {
    return PERFUMES.filter((perfume) => {
      // Search query filter (matches name, description, notes, tagline)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = perfume.name.toLowerCase().includes(query);
        const matchesDesc = perfume.description.toLowerCase().includes(query);
        const matchesTagline = perfume.tagline.toLowerCase().includes(query);
        const matchesNotes = [...perfume.topNotes, ...perfume.heartNotes, ...perfume.baseNotes].some((note) =>
          note.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDesc && !matchesTagline && !matchesNotes) {
          return false;
        }
      }

      // Fragrance Family
      if (selectedFamily !== 'All' && perfume.fragranceFamily !== selectedFamily) {
        return false;
      }

      // Mood
      if (selectedMood !== 'All' && perfume.mood !== selectedMood) {
        return false;
      }

      // Intensity
      if (selectedIntensity !== 'All' && perfume.intensity !== selectedIntensity) {
        return false;
      }

      // Occasion
      if (selectedOccasion !== 'All' && perfume.occasion !== selectedOccasion) {
        return false;
      }

      // Price (50ml price)
      if (perfume.price50ml > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price50ml - b.price50ml;
      if (sortBy === 'price-desc') return b.price50ml - a.price50ml;
      if (sortBy === 'alpha-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'alpha-desc') return b.name.localeCompare(a.name);
      // featured
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [searchQuery, selectedFamily, selectedMood, selectedIntensity, selectedOccasion, maxPrice, sortBy]);

  return (
    <section className="py-12 md:py-20 bg-[#F6F1E9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-xs uppercase tracking-widest text-[#54212D] font-medium">
            The Complete Atelier Collection
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#291F1C]">
            Twenty Original Fragrances
          </h1>
          <p className="text-sm sm:text-base text-[#291F1C]/75 font-light">
            Formulated in small numbered batches. Explore the full library of memory, mood, and exquisite botanical accords.
          </p>
        </div>

        {/* Search, Filter Toggle, and Sort Bar */}
        <div className="bg-[#F6F1E9] border border-[#D8CBBE] p-4 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#291F1C]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by perfume name, note (e.g. Saffron, Amber, Rose)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/70 border border-[#D8CBBE]/60 text-xs text-[#291F1C] placeholder-[#291F1C]/40 focus:outline-none focus:border-[#54212D] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#291F1C]/50 hover:text-[#54212D] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="md:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-[#D8CBBE] bg-white/60 text-xs uppercase tracking-wider text-[#291F1C] font-medium cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#54212D]" />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>

            {/* Sort selector */}
            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="sort-select" className="text-xs uppercase tracking-wider text-[#291F1C]/70 font-medium hidden sm:inline">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2.5 px-3 bg-white/70 border border-[#D8CBBE]/60 text-xs text-[#291F1C] focus:outline-none focus:border-[#54212D] cursor-pointer"
              >
                <option value="featured">Featured / Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="alpha-asc">Alphabetical: A to Z</option>
                <option value="alpha-desc">Alphabetical: Z to A</option>
              </select>
            </div>

            {/* Reset button if filters active */}
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs text-[#54212D] hover:underline font-medium cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

        </div>

        {/* Main Content: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Filters Column (Desktop & Mobile Drawer) */}
          <div
            className={`lg:col-span-3 space-y-6 ${
              showFiltersMobile ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-[#F6F1E9] border border-[#D8CBBE] p-6 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#D8CBBE]">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#291F1C]">
                  Filter Collection
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[#54212D] hover:underline font-medium"
                  >
                    Clear All ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Fragrance Family Filter */}
              <div>
                <p className="text-xs uppercase tracking-wider font-medium text-[#291F1C] mb-3">
                  Fragrance Family
                </p>
                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => setSelectedFamily('All')}
                    className={`block w-full text-left py-1 px-2 rounded-sm transition-colors cursor-pointer ${
                      selectedFamily === 'All' ? 'bg-[#54212D] text-[#F6F1E9] font-medium' : 'text-[#291F1C]/80 hover:bg-[#D8CBBE]/30'
                    }`}
                  >
                    All Families ({PERFUMES.length})
                  </button>
                  {FRAGRANCE_FAMILIES.map((family) => {
                    const count = PERFUMES.filter((p) => p.fragranceFamily === family).length;
                    return (
                      <button
                        key={family}
                        onClick={() => setSelectedFamily(family)}
                        className={`w-full flex items-center justify-between py-1 px-2 rounded-sm transition-colors cursor-pointer ${
                          selectedFamily === family ? 'bg-[#54212D] text-[#F6F1E9] font-medium' : 'text-[#291F1C]/80 hover:bg-[#D8CBBE]/30'
                        }`}
                      >
                        <span>{family}</span>
                        <span className="text-[10px] opacity-70 tabular-nums">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Olfactory Mood Filter */}
              <div className="pt-4 border-t border-[#D8CBBE]/60">
                <p className="text-xs uppercase tracking-wider font-medium text-[#291F1C] mb-3">
                  Olfactory Mood
                </p>
                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => setSelectedMood('All')}
                    className={`block w-full text-left py-1 px-2 rounded-sm transition-colors cursor-pointer ${
                      selectedMood === 'All' ? 'bg-[#54212D] text-[#F6F1E9] font-medium' : 'text-[#291F1C]/80 hover:bg-[#D8CBBE]/30'
                    }`}
                  >
                    All Moods
                  </button>
                  {MOODS.map((mood) => {
                    const count = PERFUMES.filter((p) => p.mood === mood.id).length;
                    return (
                      <button
                        key={mood.id}
                        onClick={() => setSelectedMood(mood.id)}
                        className={`w-full flex items-center justify-between py-1 px-2 rounded-sm transition-colors cursor-pointer ${
                          selectedMood === mood.id ? 'bg-[#54212D] text-[#F6F1E9] font-medium' : 'text-[#291F1C]/80 hover:bg-[#D8CBBE]/30'
                        }`}
                      >
                        <span>{mood.label}</span>
                        <span className="text-[10px] opacity-70 tabular-nums">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Intensity Filter */}
              <div className="pt-4 border-t border-[#D8CBBE]/60">
                <p className="text-xs uppercase tracking-wider font-medium text-[#291F1C] mb-3">
                  Sillage & Intensity
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedIntensity('All')}
                    className={`px-3 py-1.5 text-xs border transition-colors cursor-pointer ${
                      selectedIntensity === 'All'
                        ? 'border-[#54212D] bg-[#54212D] text-[#F6F1E9]'
                        : 'border-[#D8CBBE] text-[#291F1C] hover:border-[#291F1C]'
                    }`}
                  >
                    All
                  </button>
                  {intensities.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedIntensity(item)}
                      className={`px-3 py-1.5 text-xs border transition-colors cursor-pointer ${
                        selectedIntensity === item
                          ? 'border-[#54212D] bg-[#54212D] text-[#F6F1E9]'
                          : 'border-[#D8CBBE] text-[#291F1C] hover:border-[#291F1C]'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion Filter */}
              <div className="pt-4 border-t border-[#D8CBBE]/60">
                <p className="text-xs uppercase tracking-wider font-medium text-[#291F1C] mb-3">
                  Wearing Occasion
                </p>
                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => setSelectedOccasion('All')}
                    className={`block w-full text-left py-1 px-2 rounded-sm transition-colors cursor-pointer ${
                      selectedOccasion === 'All' ? 'bg-[#54212D] text-[#F6F1E9] font-medium' : 'text-[#291F1C]/80 hover:bg-[#D8CBBE]/30'
                    }`}
                  >
                    Any Occasion
                  </button>
                  {occasions.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`block w-full text-left py-1 px-2 rounded-sm transition-colors cursor-pointer ${
                        selectedOccasion === occ ? 'bg-[#54212D] text-[#F6F1E9] font-medium' : 'text-[#291F1C]/80 hover:bg-[#D8CBBE]/30'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-[#D8CBBE]/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider font-medium text-[#291F1C]">
                    Max Price (50ml)
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#54212D] tabular-nums">
                    ${maxPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min="140"
                  max="320"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#54212D] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#291F1C]/50 mt-1 font-mono">
                  <span>$140</span>
                  <span>$320</span>
                </div>
              </div>

            </div>
          </div>

          {/* Products Grid Column */}
          <div className="lg:col-span-9">
            
            {/* Results count header */}
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#D8CBBE]/60 text-xs text-[#291F1C]/70">
              <span>
                Showing <strong className="text-[#291F1C] tabular-nums">{filteredPerfumes.length}</strong> of{' '}
                <span className="tabular-nums">{PERFUMES.length}</span> creations
              </span>
              {activeFiltersCount > 0 && (
                <span className="text-[#54212D] font-medium">Filtered results</span>
              )}
            </div>

            {/* Empty State */}
            {filteredPerfumes.length === 0 ? (
              <div className="bg-[#F6F1E9] border border-[#D8CBBE] p-12 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full border border-[#D8CBBE] flex items-center justify-center text-[#54212D]">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl text-[#291F1C]">No Matching Fragrances Found</h3>
                <p className="text-sm text-[#291F1C]/70 max-w-md mx-auto">
                  We could not find fragrances matching your current selection. Try broadening your criteria or reset the filters to view the full atelier collection.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Product Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPerfumes.map((perfume) => (
                  <ProductCard key={perfume.id} perfume={perfume} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
