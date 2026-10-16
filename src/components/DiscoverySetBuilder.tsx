import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES } from '../data/perfumes';
import { DISCOVERY_SET_IMAGE } from '../assets/images';
import { Perfume } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Sparkles, Check, X, Plus, ShoppingBag, Info } from 'lucide-react';

export const DiscoverySetBuilder: React.FC = () => {
  const { addDiscoverySetToCart, showToast } = useShop();

  const [selectedIds, setSelectedIds] = useState<string[]>([
    'after-the-rain',
    'golden-hour',
    'velvet-night'
  ]);

  const selectedPerfumes = selectedIds
    .map((id) => PERFUMES.find((p) => p.id === id))
    .filter(Boolean) as Perfume[];

  const handleToggle = (perfume: Perfume) => {
    if (selectedIds.includes(perfume.id)) {
      setSelectedIds((prev) => prev.filter((id) => id !== perfume.id));
      showToast(`Removed ${perfume.name} from discovery trio`);
    } else {
      if (selectedIds.length >= 3) {
        showToast('Your discovery trio already has 3 scents. Remove one to replace it.');
        return;
      }
      setSelectedIds((prev) => [...prev, perfume.id]);
      showToast(`Added ${perfume.name} to discovery trio`);
    }
  };

  const handleAddSetToBag = () => {
    if (selectedPerfumes.length !== 3) {
      showToast('Please select exactly 3 fragrances to complete your discovery trio.');
      return;
    }
    addDiscoverySetToCart(selectedPerfumes);
  };

  return (
    <section className="py-12 md:py-20 bg-[#F6F1E9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#54212D] font-medium">
            <Sparkles className="w-4 h-4 text-[#C7A778]" />
            <span>Atelier Experience</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#291F1C]">
            Bespoke Discovery Trio
          </h1>
          <p className="text-sm sm:text-base text-[#291F1C]/75 font-light leading-relaxed">
            Curate three distinct 10ml travel flacons presented in an embossed ivory presentation box. Perfect for testing on warm skin before selecting a full grand flacon.
          </p>
        </div>

        {/* Discovery Box Presentation Box & Active Slots */}
        <div className="mb-12 bg-[#EFE9DF] border border-[#D8CBBE] p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Box Photography */}
            <div className="lg:col-span-5 aspect-[4/3] overflow-hidden border border-[#D8CBBE] shadow-md bg-[#291F1C]/5">
              <ImageWithFallback
                src={DISCOVERY_SET_IMAGE}
                alt="Bespoke Discovery Trio Box"
                fallbackTitle="Discovery Trio Presentation Box"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 3 Active Vials Slots */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#D8CBBE]">
                <div>
                  <h2 className="font-serif text-2xl text-[#291F1C]">Your Selected Trio</h2>
                  <p className="text-xs text-[#291F1C]/70">
                    {selectedIds.length} of 3 vials selected
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-2xl font-semibold text-[#54212D] tabular-nums">$65</span>
                  <span className="text-[10px] text-[#291F1C]/60 block uppercase">3 x 10ml Eau de Parfum</span>
                </div>
              </div>

              {/* 3 Interactive Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[0, 1, 2].map((slotIdx) => {
                  const perfume = selectedPerfumes[slotIdx];

                  return (
                    <div
                      key={slotIdx}
                      className={`p-4 border transition-all min-h-[140px] flex flex-col justify-between ${
                        perfume
                          ? 'border-[#54212D] bg-[#F6F1E9] shadow-sm'
                          : 'border-dashed border-[#D8CBBE] bg-[#F6F1E9]/50 text-center items-center justify-center'
                      }`}
                    >
                      {perfume ? (
                        <>
                          <div>
                            <div className="flex items-center justify-between text-[11px] text-[#54212D] font-medium mb-1">
                              <span>Vial 0{slotIdx + 1}</span>
                              <button
                                onClick={() => handleToggle(perfume)}
                                className="text-[#291F1C]/50 hover:text-[#54212D] p-1 cursor-pointer"
                                aria-label={`Remove ${perfume.name}`}
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="font-serif text-base text-[#291F1C] font-medium">{perfume.name}</p>
                            <p className="text-[10px] text-[#291F1C]/60 uppercase tracking-wider">{perfume.fragranceFamily}</p>
                          </div>
                          <p className="text-[10px] text-[#291F1C]/75 line-clamp-1 italic font-serif">
                            "{perfume.topNotes.slice(0, 2).join(', ')}"
                          </p>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <div className="w-8 h-8 rounded-full border border-dashed border-[#C7A778] flex items-center justify-center mx-auto mb-2 text-[#C7A778]">
                            <Plus className="w-4 h-4" />
                          </div>
                          <p className="text-xs text-[#291F1C]/60 font-medium">Select Vial 0{slotIdx + 1}</p>
                          <p className="text-[10px] text-[#291F1C]/40">from catalogue below</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Add to Bag CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                  onClick={handleAddSetToBag}
                  disabled={selectedPerfumes.length !== 3}
                  className={`py-4 px-8 text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    selectedPerfumes.length === 3
                      ? 'bg-[#54212D] text-[#F6F1E9] hover:bg-[#6e2d3b]'
                      : 'bg-[#D8CBBE] text-[#291F1C]/50 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {selectedPerfumes.length === 3
                      ? 'Add Bespoke Trio to Bag — $65'
                      : `Select ${3 - selectedPerfumes.length} More Fragrance${3 - selectedPerfumes.length > 1 ? 's' : ''}`}
                  </span>
                </button>

                <p className="text-[11px] text-[#291F1C]/60 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#C7A778] shrink-0" />
                  <span>Includes a $25 voucher toward any subsequent 50ml or 100ml flacon.</span>
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Catalog Selector Grid */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#D8CBBE]">
            <h2 className="font-serif text-2xl text-[#291F1C]">Select Fragrances for Your Set</h2>
            <span className="text-xs text-[#291F1C]/70">Click to select or deselect</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {PERFUMES.map((perfume) => {
              const isSelected = selectedIds.includes(perfume.id);

              return (
                <button
                  key={perfume.id}
                  onClick={() => handleToggle(perfume)}
                  className={`text-left p-3 border transition-all cursor-pointer relative group flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#54212D] bg-[#54212D]/5 shadow-md'
                      : 'border-[#D8CBBE] bg-[#F6F1E9] hover:border-[#291F1C]'
                  }`}
                >
                  {/* Selected check badge */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-[#54212D] text-[#F6F1E9] flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                  )}

                  <div className="aspect-square overflow-hidden bg-[#291F1C]/5 mb-2 border border-[#D8CBBE]/40">
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div>
                    <p className="font-serif text-sm text-[#291F1C] font-medium leading-snug group-hover:text-[#54212D] transition-colors">
                      {perfume.name}
                    </p>
                    <p className="text-[10px] text-[#291F1C]/60 uppercase tracking-wider mt-0.5">
                      {perfume.fragranceFamily}
                    </p>
                    <p className="text-[10px] text-[#54212D] mt-1 font-mono">
                      {isSelected ? '✓ In Trio' : '+ Add to Trio'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
