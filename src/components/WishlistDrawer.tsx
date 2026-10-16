import React from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES } from '../data/perfumes';
import { ImageWithFallback } from './ImageWithFallback';
import { X, Trash2, ShoppingBag, ArrowRight, Heart } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setSelectedPerfume,
    setActiveView
  } = useShop();

  if (!isWishlistOpen) return null;

  const savedPerfumes = wishlist
    .map((id) => PERFUMES.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#291F1C]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#F6F1E9] border-l border-[#D8CBBE] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#D8CBBE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#54212D] fill-[#54212D]" />
            <h2 className="font-serif text-2xl text-[#291F1C]">Saved Fragrances</h2>
            <span className="text-xs font-mono text-[#54212D] tabular-nums">({savedPerfumes.length})</span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close Wishlist"
            className="p-2 text-[#291F1C]/70 hover:text-[#54212D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {savedPerfumes.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-12 h-12 rounded-full border border-dashed border-[#D8CBBE] flex items-center justify-center mx-auto text-[#D8CBBE]">
                <Heart className="w-5 h-5 text-[#C7A778]" />
              </div>
              <h3 className="font-serif text-xl text-[#291F1C]">Your Wishlist is Empty</h3>
              <p className="text-xs text-[#291F1C]/70 max-w-xs mx-auto leading-relaxed">
                Save creations that catch your imagination while browsing our collection to revisit them anytime.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  setActiveView('shop');
                }}
                className="px-6 py-2.5 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-wider font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            savedPerfumes.map((perfume) => (
              <div
                key={perfume!.id}
                className="p-4 bg-[#EFE9DF]/60 border border-[#D8CBBE] flex gap-4 items-center"
              >
                <div
                  onClick={() => {
                    setSelectedPerfume(perfume!);
                    setIsWishlistOpen(false);
                  }}
                  className="w-16 h-20 bg-[#291F1C]/5 overflow-hidden shrink-0 border border-[#D8CBBE]/60 cursor-pointer"
                >
                  <img
                    src={perfume!.image}
                    alt={perfume!.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#54212D] font-medium block">
                    {perfume!.fragranceFamily}
                  </span>
                  <h4
                    onClick={() => {
                      setSelectedPerfume(perfume!);
                      setIsWishlistOpen(false);
                    }}
                    className="font-serif text-lg text-[#291F1C] truncate hover:text-[#54212D] cursor-pointer"
                  >
                    {perfume!.name}
                  </h4>
                  <p className="font-mono text-xs text-[#291F1C] font-semibold tabular-nums mt-0.5">
                    ${perfume!.price50ml} <span className="text-[10px] font-normal text-[#291F1C]/60">(50ml)</span>
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => {
                        addToCart(perfume!, '50ml', 1);
                      }}
                      className="text-xs uppercase tracking-wider font-medium text-[#54212D] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                    <span className="text-[#D8CBBE]">·</span>
                    <button
                      onClick={() => toggleWishlist(perfume!.id)}
                      className="text-xs text-[#291F1C]/60 hover:text-[#54212D] flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedPerfumes.length > 0 && (
          <div className="p-6 border-t border-[#D8CBBE] bg-[#EFE9DF]/80 space-y-3">
            <p className="text-[11px] text-[#291F1C]/70 text-center font-light">
              Items saved in your browser storage.
            </p>
            <button
              onClick={() => {
                savedPerfumes.forEach((p) => addToCart(p!, '50ml', 1));
                setIsWishlistOpen(false);
              }}
              className="w-full py-3.5 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer shadow-sm text-center"
            >
              Add All to Shopping Bag
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
