import React from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES } from '../data/perfumes';
import { ImageWithFallback } from './ImageWithFallback';
import { X, Plus, Sparkles, ShoppingBag, Eye } from 'lucide-react';

export const PerfumeComparison: React.FC = () => {
  const {
    comparisonList,
    removeFromComparison,
    addToComparison,
    setSelectedPerfume,
    addToCart,
    setActiveView
  } = useShop();

  const handleAddSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (!selectedId) return;
    const found = PERFUMES.find((p) => p.id === selectedId);
    if (found) {
      addToComparison(found);
    }
    e.target.value = '';
  };

  const availableToAdd = PERFUMES.filter(
    (p) => !comparisonList.some((cp) => cp.id === p.id)
  );

  return (
    <section className="py-12 md:py-20 bg-[#F6F1E9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#54212D] font-medium">
            <Sparkles className="w-4 h-4 text-[#C7A778]" />
            <span>Olfactory Comparison Studio</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#291F1C]">
            Compare Scent Profiles Side by Side
          </h1>
          <p className="text-sm sm:text-base text-[#291F1C]/75 font-light">
            Examine notes, longevity, families, and emotional nuances across up to three artisan creations simultaneously.
          </p>
        </div>

        {/* Add more selector */}
        {comparisonList.length < 3 && availableToAdd.length > 0 && (
          <div className="max-w-md mx-auto mb-8 bg-[#EFE9DF] p-4 border border-[#D8CBBE] flex items-center gap-3">
            <Plus className="w-4 h-4 text-[#54212D] shrink-0" />
            <select
              onChange={handleAddSelect}
              defaultValue=""
              className="w-full bg-[#F6F1E9] border border-[#D8CBBE] p-2 text-xs text-[#291F1C] focus:outline-none focus:border-[#54212D] cursor-pointer"
            >
              <option value="" disabled>Add another perfume to compare (up to 3)...</option>
              {availableToAdd.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.fragranceFamily}
                </option>
              ))}
            </select>
          </div>
        )}

        {comparisonList.length === 0 ? (
          <div className="bg-[#F6F1E9] border border-[#D8CBBE] p-12 text-center space-y-4 max-w-xl mx-auto">
            <h3 className="font-serif text-2xl text-[#291F1C]">No Fragrances Selected for Comparison</h3>
            <p className="text-xs text-[#291F1C]/70">
              Select perfumes from the collection to analyze their notes, families, and accords side by side.
            </p>
            <button
              onClick={() => setActiveView('shop')}
              className="px-6 py-3 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto pb-6">
            <div className={`grid gap-6 min-w-[650px] ${
              comparisonList.length === 1
                ? 'grid-cols-1 max-w-md mx-auto'
                : comparisonList.length === 2
                ? 'grid-cols-2 max-w-4xl mx-auto'
                : 'grid-cols-3'
            }`}>
              {comparisonList.map((perfume) => (
                <div
                  key={perfume.id}
                  className="bg-[#F6F1E9] border border-[#D8CBBE] p-6 flex flex-col justify-between shadow-sm relative"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromComparison(perfume.id)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#F6F1E9] hover:bg-[#54212D] text-[#291F1C] hover:text-[#F6F1E9] border border-[#D8CBBE] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label={`Remove ${perfume.name} from comparison`}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-6">
                    {/* Visual */}
                    <div className="aspect-[4/3] overflow-hidden bg-[#291F1C]/5 border border-[#D8CBBE]/60">
                      <ImageWithFallback
                        src={perfume.image}
                        alt={perfume.name}
                        fallbackTitle={perfume.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="font-serif text-2xl text-[#291F1C]">{perfume.name}</h3>
                      <p className="text-xs italic text-[#C7A778] font-serif mt-0.5">"{perfume.tagline}"</p>
                    </div>

                    {/* Pricing */}
                    <div className="pt-3 border-t border-[#D8CBBE]/60 flex items-center justify-between text-xs">
                      <span className="text-[#291F1C]/60 uppercase tracking-wider">Prices</span>
                      <div className="text-right font-mono">
                        <span className="font-semibold text-sm text-[#291F1C] tabular-nums">${perfume.price50ml}</span>
                        <span className="text-[10px] text-[#291F1C]/60"> (50ml) / </span>
                        <span className="font-semibold text-sm text-[#291F1C] tabular-nums">${perfume.price100ml}</span>
                        <span className="text-[10px] text-[#291F1C]/60"> (100ml)</span>
                      </div>
                    </div>

                    {/* Family & Mood */}
                    <div className="pt-3 border-t border-[#D8CBBE]/60 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#291F1C]/60 uppercase tracking-wider">Family</span>
                        <span className="font-medium text-[#54212D]">{perfume.fragranceFamily}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#291F1C]/60 uppercase tracking-wider">Mood</span>
                        <span className="font-medium text-[#291F1C]">{perfume.mood}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#291F1C]/60 uppercase tracking-wider">Occasion</span>
                        <span className="font-medium text-[#291F1C]">{perfume.occasion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#291F1C]/60 uppercase tracking-wider">Intensity</span>
                        <span className="font-medium text-[#291F1C]">{perfume.intensity}</span>
                      </div>
                    </div>

                    {/* Notes Breakdown */}
                    <div className="pt-3 border-t border-[#D8CBBE]/60 space-y-2 text-xs">
                      <div>
                        <span className="font-semibold text-[#54212D] block uppercase tracking-wider text-[10px]">
                          Top Notes
                        </span>
                        <p className="text-[#291F1C]/80 mt-0.5">{perfume.topNotes.join(', ')}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-[#54212D] block uppercase tracking-wider text-[10px]">
                          Heart Notes
                        </span>
                        <p className="text-[#291F1C]/80 mt-0.5">{perfume.heartNotes.join(', ')}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-[#54212D] block uppercase tracking-wider text-[10px]">
                          Base Notes
                        </span>
                        <p className="text-[#291F1C]/80 mt-0.5">{perfume.baseNotes.join(', ')}</p>
                      </div>
                    </div>

                    {/* Evocative Story */}
                    <div className="pt-3 border-t border-[#D8CBBE]/60 text-xs italic text-[#291F1C]/75 leading-relaxed bg-[#EFE9DF]/50 p-3">
                      "{perfume.story}"
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="pt-6 space-y-2">
                    <button
                      onClick={() => setSelectedPerfume(perfume)}
                      className="w-full py-2.5 px-4 bg-[#F6F1E9] border border-[#54212D] text-[#54212D] hover:bg-[#54212D] hover:text-[#F6F1E9] text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>

                    <button
                      onClick={() => addToCart(perfume, '50ml', 1)}
                      className="w-full py-2.5 px-4 bg-[#54212D] text-[#F6F1E9] hover:bg-[#6e2d3b] text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add (50ml) to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
