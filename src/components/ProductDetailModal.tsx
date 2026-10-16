import React, { useState } from 'react';
import { Perfume } from '../types';
import { useShop } from '../context/ShopContext';
import { PERFUMES } from '../data/perfumes';
import { ImageWithFallback } from './ImageWithFallback';
import { X, Heart, Plus, Minus, ArrowRight, Sparkles, Droplet, ShieldCheck, Truck } from 'lucide-react';

interface ProductDetailModalProps {
  perfume: Perfume;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ perfume, onClose }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveView,
    setSelectedPerfume,
    addToComparison
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('50ml');
  const [quantity, setQuantity] = useState(1);

  const price = selectedSize === '50ml' ? perfume.price50ml : perfume.price100ml;
  const isFavorited = isInWishlist(perfume.id);

  // Related perfumes by family or mood
  const relatedPerfumes = PERFUMES.filter(
    (p) => p.id !== perfume.id && (p.fragranceFamily === perfume.fragranceFamily || p.mood === perfume.mood)
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(perfume, selectedSize, quantity);
  };

  const handleOpenScentLab = () => {
    onClose();
    setActiveView('scent-lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto bg-[#291F1C]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#F6F1E9] border border-[#D8CBBE] shadow-2xl my-auto overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Product Details"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#F6F1E9]/90 hover:bg-[#54212D] text-[#291F1C] hover:text-[#F6F1E9] flex items-center justify-center transition-colors cursor-pointer shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Big Image Display */}
          <div className="lg:col-span-6 bg-[#291F1C]/5 relative min-h-[380px] lg:min-h-[550px]">
            <ImageWithFallback
              src={perfume.image}
              alt={perfume.name}
              fallbackTitle={perfume.name}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-4 left-4 right-4 bg-[#F6F1E9]/90 backdrop-blur-sm p-4 border border-[#D8CBBE]/60 text-xs">
              <span className="text-[#54212D] font-medium uppercase tracking-wider block mb-1">
                Olfactory Concentration
              </span>
              <p className="text-[#291F1C]/80 font-light">
                Extrait de Parfum / 22% Concentration · Macerated 8 weeks in Grasse
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Product Story and Purchase Controls */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Mood metadata */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#54212D] font-medium mb-2">
                <span>{perfume.fragranceFamily}</span>
                <span aria-hidden="true">·</span>
                <span>{perfume.mood}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#291F1C] font-light leading-tight">
                {perfume.name}
              </h2>

              <p className="italic font-serif text-lg text-[#C7A778] mt-1">
                "{perfume.tagline}"
              </p>

              {/* Price display */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-3xl text-[#291F1C] font-semibold tabular-nums">
                  ${price}
                </span>
                <span className="text-xs text-[#291F1C]/60 uppercase tracking-widest">
                  USD · Complimentary Delivery
                </span>
              </div>

              {/* Description & Narrative */}
              <div className="mt-6 space-y-3 text-sm text-[#291F1C]/80 leading-relaxed font-light">
                <p>{perfume.description}</p>
                <div className="p-3 bg-[#EFE9DF]/60 border-l-2 border-[#54212D] text-xs italic text-[#291F1C]/75">
                  "{perfume.story}"
                </div>
              </div>

              {/* Olfactory Pyramid (Notes) */}
              <div className="mt-6 pt-6 border-t border-[#D8CBBE]/60 space-y-3">
                <p className="text-xs uppercase tracking-widest font-medium text-[#291F1C]">
                  The Olfactory Pyramid
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#F6F1E9] border border-[#D8CBBE]/60">
                    <span className="text-[10px] uppercase tracking-wider text-[#54212D] font-semibold block mb-1">
                      Top Notes
                    </span>
                    <p className="text-[#291F1C]/80 leading-snug">{perfume.topNotes.join(', ')}</p>
                  </div>

                  <div className="p-3 bg-[#F6F1E9] border border-[#D8CBBE]/60">
                    <span className="text-[10px] uppercase tracking-wider text-[#54212D] font-semibold block mb-1">
                      Heart Notes
                    </span>
                    <p className="text-[#291F1C]/80 leading-snug">{perfume.heartNotes.join(', ')}</p>
                  </div>

                  <div className="p-3 bg-[#F6F1E9] border border-[#D8CBBE]/60">
                    <span className="text-[10px] uppercase tracking-wider text-[#54212D] font-semibold block mb-1">
                      Base Notes
                    </span>
                    <p className="text-[#291F1C]/80 leading-snug">{perfume.baseNotes.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-6 space-y-2">
                <label className="text-xs uppercase tracking-widest font-medium text-[#291F1C] block">
                  Select Flacon Size
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedSize('50ml')}
                    className={`py-3 px-4 text-xs uppercase tracking-wider font-medium border text-center transition-all cursor-pointer ${
                      selectedSize === '50ml'
                        ? 'border-[#54212D] bg-[#54212D] text-[#F6F1E9]'
                        : 'border-[#D8CBBE] bg-[#F6F1E9] text-[#291F1C] hover:border-[#291F1C]'
                    }`}
                  >
                    <span>50ml Eau de Parfum</span>
                    <span className="block font-mono text-[13px] mt-0.5 tabular-nums">${perfume.price50ml}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSize('100ml')}
                    className={`py-3 px-4 text-xs uppercase tracking-wider font-medium border text-center transition-all cursor-pointer ${
                      selectedSize === '100ml'
                        ? 'border-[#54212D] bg-[#54212D] text-[#F6F1E9]'
                        : 'border-[#D8CBBE] bg-[#F6F1E9] text-[#291F1C] hover:border-[#291F1C]'
                    }`}
                  >
                    <span>100ml Grand Flacon</span>
                    <span className="block font-mono text-[13px] mt-0.5 tabular-nums">${perfume.price100ml}</span>
                  </button>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4 items-stretch">
                <div className="flex items-center justify-between border border-[#D8CBBE] px-4 py-3 bg-[#F6F1E9] sm:w-36">
                  <span className="text-xs text-[#291F1C]/60 uppercase tracking-wider mr-2">Qty</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="p-1 hover:text-[#54212D] cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-sm font-semibold tabular-nums w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="p-1 hover:text-[#54212D] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer shadow-sm text-center"
                >
                  Add to Bag — ${(price * quantity).toLocaleString()}
                </button>

                <button
                  onClick={() => toggleWishlist(perfume.id)}
                  aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  className="p-4 border border-[#D8CBBE] text-[#291F1C] hover:text-[#54212D] hover:border-[#54212D] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorited ? 'fill-[#54212D] text-[#54212D]' : 'text-[#291F1C]'
                    }`}
                  />
                </button>
              </div>

              {/* Extra discovery actions */}
              <div className="mt-4 pt-4 border-t border-[#D8CBBE]/50 flex flex-wrap items-center justify-between gap-3 text-xs">
                <button
                  onClick={handleOpenScentLab}
                  className="text-[#54212D] hover:underline flex items-center gap-1.5 cursor-pointer font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C7A778]" />
                  <span>Layer this scent in Scent Lab →</span>
                </button>

                <button
                  onClick={() => addToComparison(perfume)}
                  className="text-[#291F1C]/70 hover:text-[#54212D] cursor-pointer"
                >
                  Add to Side-by-Side Comparison
                </button>
              </div>

              {/* Guarantees */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-[11px] text-[#291F1C]/70 pt-4 border-t border-[#D8CBBE]/40">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C7A778]" />
                  <span>Complimentary Tracked Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C7A778]" />
                  <span>Authentic Master Perfumery Guarantee</span>
                </div>
              </div>

            </div>

            {/* Related recommendations */}
            {relatedPerfumes.length > 0 && (
              <div className="pt-6 border-t border-[#D8CBBE]/60">
                <p className="text-xs uppercase tracking-widest text-[#291F1C]/70 font-medium mb-3">
                  Complementary Olfactory Profiles
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {relatedPerfumes.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => {
                        setSelectedPerfume(rel);
                        setSelectedSize('50ml');
                        setQuantity(1);
                      }}
                      className="text-left group/rel p-2 border border-[#D8CBBE]/50 hover:border-[#54212D] bg-[#F6F1E9] transition-all cursor-pointer"
                    >
                      <div className="aspect-square overflow-hidden mb-1.5 bg-[#291F1C]/5">
                        <img
                          src={rel.image}
                          alt={rel.name}
                          className="w-full h-full object-cover group-hover/rel:scale-105 transition-transform"
                        />
                      </div>
                      <p className="font-serif text-xs text-[#291F1C] group-hover/rel:text-[#54212D] truncate font-medium">
                        {rel.name}
                      </p>
                      <p className="text-[10px] text-[#291F1C]/60 tabular-nums">${rel.price50ml}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
