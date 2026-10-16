import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES, CURATED_PAIRINGS } from '../data/perfumes';
import { SCENT_LAB_IMAGE } from '../assets/images';
import { ImageWithFallback } from './ImageWithFallback';
import { Sparkles, ArrowRightLeft, Plus, Droplets, Info } from 'lucide-react';
import { Perfume } from '../types';

export const ScentLab: React.FC = () => {
  const { addToCart, showToast } = useShop();

  const [fragranceAId, setFragranceAId] = useState<string>('golden-hour');
  const [fragranceBId, setFragranceBId] = useState<string>('after-the-rain');

  const perfumeA = useMemo(() => PERFUMES.find((p) => p.id === fragranceAId) || PERFUMES[0], [fragranceAId]);
  const perfumeB = useMemo(() => PERFUMES.find((p) => p.id === fragranceBId) || PERFUMES[1], [fragranceBId]);

  // Swap fragrances A and B
  const handleSwap = () => {
    const temp = fragranceAId;
    setFragranceAId(fragranceBId);
    setFragranceBId(temp);
  };

  // Select curated recipe
  const handleSelectCurated = (aId: string, bId: string) => {
    setFragranceAId(aId);
    setFragranceBId(bId);
  };

  // Find shared notes
  const sharedNotes = useMemo(() => {
    const allNotesA = [...perfumeA.topNotes, ...perfumeA.heartNotes, ...perfumeA.baseNotes].map((n) => n.toLowerCase());
    const allNotesB = [...perfumeB.topNotes, ...perfumeB.heartNotes, ...perfumeB.baseNotes];

    const shared: string[] = [];
    allNotesB.forEach((noteB) => {
      if (allNotesA.some((nA) => nA.includes(noteB.toLowerCase()) || noteB.toLowerCase().includes(nA))) {
        shared.push(noteB);
      }
    });
    return Array.from(new Set(shared));
  }, [perfumeA, perfumeB]);

  // Determine layering strategy
  const layeringGuidance = useMemo(() => {
    const heavierFamilies = ['Woody & Amber', 'Oriental & Spicy', 'Gourmand & Fruity'];
    const lighterFamilies = ['Fresh & Citrus', 'Aquatic & Ozonic', 'Floral & Botanical'];

    const aIsHeavy = heavierFamilies.includes(perfumeA.fragranceFamily);
    const bIsHeavy = heavierFamilies.includes(perfumeB.fragranceFamily);

    let baseFragrance: Perfume;
    let topFragrance: Perfume;

    if (aIsHeavy && !bIsHeavy) {
      baseFragrance = perfumeA;
      topFragrance = perfumeB;
    } else if (!aIsHeavy && bIsHeavy) {
      baseFragrance = perfumeB;
      topFragrance = perfumeA;
    } else {
      // If same tier, use intensity
      if (perfumeA.intensity === 'Intense' && perfumeB.intensity !== 'Intense') {
        baseFragrance = perfumeA;
        topFragrance = perfumeB;
      } else {
        baseFragrance = perfumeA;
        topFragrance = perfumeB;
      }
    }

    return {
      base: baseFragrance,
      top: topFragrance,
      instruction: `Begin with 1–2 sprays of ${baseFragrance.name} onto primary pulse points (wrists and base of neck) to establish the warm foundational dry-down. Allow 30 seconds for initial evaporation, then mist ${topFragrance.name} over collarbones or hair for an ethereal, floating aura.`
    };
  }, [perfumeA, perfumeB]);

  const handleAddBothToCart = () => {
    addToCart(perfumeA, '50ml', 1);
    addToCart(perfumeB, '50ml', 1);
    showToast(`Added both ${perfumeA.name} and ${perfumeB.name} (50ml) to your bag`);
  };

  return (
    <section className="py-12 md:py-20 bg-[#F6F1E9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#54212D] font-medium">
            <Sparkles className="w-4 h-4 text-[#C7A778]" />
            <span>Interactive Fragrance Discovery Studio</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#291F1C]">
            The Scent Lab
          </h1>
          <p className="text-sm sm:text-base text-[#291F1C]/75 font-light leading-relaxed">
            In classical perfumery, layering two fragrances unlocks an aura uniquely your own. Select any two fragrances from our catalogue to discover their olfactory chords and layering technique.
          </p>
        </div>

        {/* Curated Pairings Quick Strip */}
        <div className="mb-10 bg-[#EFE9DF]/80 border border-[#D8CBBE] p-4 sm:p-6">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#291F1C] mb-3">
            Master Perfumer Formulated Pairings
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CURATED_PAIRINGS.map((recipe) => {
              const pA = PERFUMES.find((p) => p.id === recipe.fragranceAId);
              const pB = PERFUMES.find((p) => p.id === recipe.fragranceBId);
              const isSelected = fragranceAId === recipe.fragranceAId && fragranceBId === recipe.fragranceBId;

              return (
                <button
                  key={recipe.pairingTitle}
                  onClick={() => handleSelectCurated(recipe.fragranceAId, recipe.fragranceBId)}
                  className={`text-left p-3 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#54212D] bg-[#54212D] text-[#F6F1E9]'
                      : 'border-[#D8CBBE]/80 bg-[#F6F1E9] text-[#291F1C] hover:border-[#291F1C]'
                  }`}
                >
                  <p className="font-serif text-sm font-medium">{recipe.pairingTitle}</p>
                  <p className={`text-[11px] truncate mt-1 ${isSelected ? 'text-[#F6F1E9]/80' : 'text-[#291F1C]/65'}`}>
                    {pA?.name} + {pB?.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* The Dual Flacon Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Fragrance A Selector Card */}
          <div className="lg:col-span-5 bg-[#F6F1E9] border border-[#D8CBBE] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-[#54212D] font-medium">
                Fragrance Alpha
              </span>
              <span className="text-[11px] font-mono text-[#291F1C]/60 tabular-nums">
                ${perfumeA.price50ml} (50ml)
              </span>
            </div>

            {/* Dropdown Selector */}
            <div className="mb-4">
              <label htmlFor="fragrance-a-select" className="sr-only">Select Fragrance Alpha</label>
              <select
                id="fragrance-a-select"
                value={fragranceAId}
                onChange={(e) => setFragranceAId(e.target.value)}
                className="w-full p-2.5 bg-white/80 border border-[#D8CBBE] text-sm text-[#291F1C] font-serif focus:outline-none focus:border-[#54212D] cursor-pointer"
              >
                {PERFUMES.map((p) => (
                  <option key={p.id} value={p.id} disabled={p.id === fragranceBId}>
                    {p.name} ({p.fragranceFamily})
                  </option>
                ))}
              </select>
            </div>

            {/* Flacon Visual */}
            <div className="aspect-[4/3] overflow-hidden bg-[#291F1C]/5 border border-[#D8CBBE]/60 mb-4">
              <ImageWithFallback
                src={perfumeA.image}
                alt={perfumeA.name}
                fallbackTitle={perfumeA.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#291F1C]">{perfumeA.name}</h3>
              <p className="text-xs text-[#291F1C]/75 font-light leading-relaxed">{perfumeA.description}</p>
              
              <div className="pt-2 text-xs text-[#291F1C]/70">
                <p><strong className="text-[#54212D]">Family:</strong> {perfumeA.fragranceFamily}</p>
                <p><strong className="text-[#54212D]">Top Notes:</strong> {perfumeA.topNotes.join(', ')}</p>
                <p><strong className="text-[#54212D]">Heart:</strong> {perfumeA.heartNotes.join(', ')}</p>
                <p><strong className="text-[#54212D]">Base:</strong> {perfumeA.baseNotes.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Center Connection & Swap Action */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-24 space-y-4">
            <button
              onClick={handleSwap}
              className="p-4 rounded-full border border-[#54212D] bg-[#F6F1E9] text-[#54212D] hover:bg-[#54212D] hover:text-[#F6F1E9] transition-all cursor-pointer shadow-md group"
              title="Swap Fragrances"
              aria-label="Swap Fragrance A and Fragrance B"
            >
              <ArrowRightLeft className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <span className="text-[11px] uppercase tracking-widest text-[#291F1C]/60 font-medium">
              Layering Accord
            </span>
          </div>

          {/* Fragrance B Selector Card */}
          <div className="lg:col-span-5 bg-[#F6F1E9] border border-[#D8CBBE] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-[#54212D] font-medium">
                Fragrance Beta
              </span>
              <span className="text-[11px] font-mono text-[#291F1C]/60 tabular-nums">
                ${perfumeB.price50ml} (50ml)
              </span>
            </div>

            {/* Dropdown Selector */}
            <div className="mb-4">
              <label htmlFor="fragrance-b-select" className="sr-only">Select Fragrance Beta</label>
              <select
                id="fragrance-b-select"
                value={fragranceBId}
                onChange={(e) => setFragranceBId(e.target.value)}
                className="w-full p-2.5 bg-white/80 border border-[#D8CBBE] text-sm text-[#291F1C] font-serif focus:outline-none focus:border-[#54212D] cursor-pointer"
              >
                {PERFUMES.map((p) => (
                  <option key={p.id} value={p.id} disabled={p.id === fragranceAId}>
                    {p.name} ({p.fragranceFamily})
                  </option>
                ))}
              </select>
            </div>

            {/* Flacon Visual */}
            <div className="aspect-[4/3] overflow-hidden bg-[#291F1C]/5 border border-[#D8CBBE]/60 mb-4">
              <ImageWithFallback
                src={perfumeB.image}
                alt={perfumeB.name}
                fallbackTitle={perfumeB.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#291F1C]">{perfumeB.name}</h3>
              <p className="text-xs text-[#291F1C]/75 font-light leading-relaxed">{perfumeB.description}</p>
              
              <div className="pt-2 text-xs text-[#291F1C]/70">
                <p><strong className="text-[#54212D]">Family:</strong> {perfumeB.fragranceFamily}</p>
                <p><strong className="text-[#54212D]">Top Notes:</strong> {perfumeB.topNotes.join(', ')}</p>
                <p><strong className="text-[#54212D]">Heart:</strong> {perfumeB.heartNotes.join(', ')}</p>
                <p><strong className="text-[#54212D]">Base:</strong> {perfumeB.baseNotes.join(', ')}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Synthesized Olfactory Accord & Layering Guidance */}
        <div className="bg-[#EFE9DF] border border-[#D8CBBE] p-6 sm:p-10 shadow-md">
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8CBBE]">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#54212D] font-medium">
                  Layering Synthesis
                </p>
                <h2 className="font-serif text-3xl text-[#291F1C]">
                  {perfumeA.name} & {perfumeB.name}
                </h2>
              </div>

              <button
                onClick={handleAddBothToCart}
                className="px-6 py-3.5 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Both Flacons to Bag — ${(perfumeA.price50ml + perfumeB.price50ml).toLocaleString()}</span>
              </button>
            </div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Shared Notes */}
              <div className="p-4 bg-[#F6F1E9] border border-[#D8CBBE]/60 space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#54212D] font-semibold block">
                  Harmonizing Notes
                </span>
                {sharedNotes.length > 0 ? (
                  <p className="text-xs text-[#291F1C]/80 leading-relaxed">
                    Shared bridge: <strong className="text-[#291F1C]">{sharedNotes.join(', ')}</strong>. These common accords allow the two fragrances to blend seamlessly into a cohesive, uninterrupted scent envelope.
                  </p>
                ) : (
                  <p className="text-xs text-[#291F1C]/80 leading-relaxed">
                    Contrasting accords: {perfumeA.fragranceFamily} meets {perfumeB.fragranceFamily}. The juxtaposition creates a dynamic tension between freshness and warmth.
                  </p>
                )}
              </div>

              {/* Suggested Layering Order */}
              <div className="p-4 bg-[#F6F1E9] border border-[#D8CBBE]/60 space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#54212D] font-semibold block">
                  Recommended Order
                </span>
                <p className="text-xs text-[#291F1C]/80 leading-relaxed">
                  <strong className="text-[#291F1C]">Foundation:</strong> {layeringGuidance.base.name} (heavier density). <br />
                  <strong className="text-[#291F1C]">Top Mist:</strong> {layeringGuidance.top.name} (brighter volatile oils).
                </p>
              </div>

              {/* Combined Mood */}
              <div className="p-4 bg-[#F6F1E9] border border-[#D8CBBE]/60 space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#54212D] font-semibold block">
                  Resulting Scent Aura
                </span>
                <p className="text-xs text-[#291F1C]/80 leading-relaxed">
                  Combines the {perfumeA.mood.toLowerCase()} allure of {perfumeA.name} with the {perfumeB.mood.toLowerCase()} nuances of {perfumeB.name}, evolving continuously over 8–10 hours of skin wear.
                </p>
              </div>

            </div>

            {/* Detailed Instructions */}
            <div className="p-4 bg-[#F6F1E9] border-l-2 border-[#54212D] text-xs text-[#291F1C]/80 space-y-1">
              <span className="font-medium text-[#291F1C] block uppercase tracking-wider">
                Application Technique:
              </span>
              <p className="leading-relaxed">{layeringGuidance.instruction}</p>
            </div>

            {/* Transparent Disclaimer */}
            <div className="flex items-start gap-2 text-[11px] text-[#291F1C]/60 pt-2">
              <Info className="w-3.5 h-3.5 text-[#C7A778] shrink-0 mt-0.5" />
              <span>
                Note: Fragrance layering suggestions are based on classical olfactory balance and note profiles. Skin chemistry and body temperature vary naturally and shape the final scent expression.
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
