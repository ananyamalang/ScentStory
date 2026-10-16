import React from 'react';
import { Perfume } from '../types';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from './ImageWithFallback';
import { Heart, Plus, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  perfume: Perfume;
  onSelect?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ perfume, onSelect }) => {
  const {
    setSelectedPerfume,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToComparison
  } = useShop();

  const isFavorited = isInWishlist(perfume.id);

  const handleCardClick = () => {
    if (onSelect) {
      onSelect();
    } else {
      setSelectedPerfume(perfume);
    }
  };

  return (
    <div className="group flex flex-col bg-[#F6F1E9] border border-[#D8CBBE] hover:border-[#291F1C]/40 transition-all duration-300 relative">
      {/* Visual Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#291F1C]/5">
        <ImageWithFallback
          src={perfume.image}
          alt={`${perfume.name} Eau de Parfum`}
          fallbackTitle={perfume.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Overlay hover actions */}
        <div className="absolute inset-0 bg-[#291F1C]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="px-4 py-2 bg-[#F6F1E9] text-[#291F1C] hover:bg-[#54212D] hover:text-[#F6F1E9] text-xs uppercase tracking-wider font-medium shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(perfume, '50ml', 1);
            }}
            className="px-4 py-2 bg-[#54212D] text-[#F6F1E9] hover:bg-[#6e2d3b] text-xs uppercase tracking-wider font-medium shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add (50ml)</span>
          </button>
        </div>

        {/* Top Floating Controls */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {perfume.bestSeller ? (
            <span className="text-[10px] uppercase tracking-widest text-[#54212D] font-medium bg-[#F6F1E9]/90 px-2.5 py-1 shadow-sm">
              Maison Essential
            </span>
          ) : <span />}

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(perfume.id);
            }}
            aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
            className="w-8 h-8 rounded-full bg-[#F6F1E9]/90 hover:bg-[#F6F1E9] text-[#291F1C] hover:text-[#54212D] flex items-center justify-center transition-colors pointer-events-auto shadow-sm cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorited ? 'fill-[#54212D] text-[#54212D]' : 'text-[#291F1C]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Information Area */}
      <div
        onClick={handleCardClick}
        className="p-5 flex flex-col flex-1 justify-between cursor-pointer space-y-3"
      >
        <div>
          {/* Metadata line: Zero-pill discipline */}
          <div className="flex items-center gap-2 text-xs text-[#291F1C]/60 tracking-wider uppercase mb-1.5">
            <span>{perfume.fragranceFamily}</span>
            <span aria-hidden="true">·</span>
            <span>{perfume.mood}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-[#291F1C] group-hover:text-[#54212D] transition-colors font-normal">
            {perfume.name}
          </h3>

          <p className="text-xs text-[#291F1C]/75 line-clamp-2 mt-1.5 font-light leading-relaxed">
            {perfume.description}
          </p>
        </div>

        {/* Notes preview and Price row */}
        <div className="pt-3 border-t border-[#D8CBBE]/50 flex items-center justify-between text-xs">
          <div className="text-[11px] text-[#291F1C]/65 truncate max-w-[170px]" title={perfume.topNotes.join(', ')}>
            <span className="font-medium text-[#54212D]">Notes:</span> {perfume.topNotes.slice(0, 2).join(', ')}...
          </div>

          <div className="text-right">
            <span className="font-mono text-sm text-[#291F1C] font-semibold tabular-nums">
              ${perfume.price50ml}
            </span>
            <span className="text-[10px] text-[#291F1C]/60 block uppercase">50ml</span>
          </div>
        </div>
      </div>

      {/* Compare button subtle link */}
      <div className="px-5 pb-3 pt-0 flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToComparison(perfume);
          }}
          className="text-[11px] text-[#54212D] hover:underline cursor-pointer flex items-center gap-1 font-medium"
        >
          <Sparkles className="w-3 h-3 text-[#C7A778]" />
          <span>Compare</span>
        </button>
      </div>
    </div>
  );
};
