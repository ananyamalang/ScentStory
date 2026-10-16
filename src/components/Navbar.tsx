import React, { useState } from 'react';
import { useShop, ActiveView } from '../context/ShopContext';
import { ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setSelectedPerfume
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setSelectedPerfume(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F1E9]/95 backdrop-blur-md border-b border-[#D8CBBE]/50 transition-all">
      {/* Top Bar Announcement */}
      <div className="bg-[#54212D] text-[#F6F1E9] text-[11px] py-1.5 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-2">
        <span>Complimentary luxury sample & shipping on all orders over $150</span>
      </div>

      {/* Main Top Bar: Strict 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-tight text-[#291F1C] group-hover:text-[#54212D] transition-colors whitespace-nowrap shrink-0">
            ScentStory
          </span>
        </button>

        {/* Zone 2: Single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-widest uppercase font-medium text-[#291F1C]/80">
          <button
            onClick={() => handleNavClick('shop')}
            className={`cursor-pointer transition-colors hover:text-[#54212D] whitespace-nowrap shrink-0 ${
              activeView === 'shop' ? 'text-[#54212D] font-semibold border-b border-[#54212D] pb-0.5' : ''
            }`}
          >
            Collection
          </button>
          <button
            onClick={() => handleNavClick('scent-lab')}
            className={`cursor-pointer transition-colors hover:text-[#54212D] whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeView === 'scent-lab' ? 'text-[#54212D] font-semibold border-b border-[#54212D] pb-0.5' : ''
            }`}
          >
            <span>Scent Lab</span>
          </button>
          <button
            onClick={() => handleNavClick('quiz')}
            className={`cursor-pointer transition-colors hover:text-[#54212D] whitespace-nowrap shrink-0 ${
              activeView === 'quiz' ? 'text-[#54212D] font-semibold border-b border-[#54212D] pb-0.5' : ''
            }`}
          >
            Find Your Scent
          </button>
          <button
            onClick={() => handleNavClick('discovery-set')}
            className={`cursor-pointer transition-colors hover:text-[#54212D] whitespace-nowrap shrink-0 ${
              activeView === 'discovery-set' ? 'text-[#54212D] font-semibold border-b border-[#54212D] pb-0.5' : ''
            }`}
          >
            Discovery Trio
          </button>
          <button
            onClick={() => handleNavClick('compare')}
            className={`cursor-pointer transition-colors hover:text-[#54212D] whitespace-nowrap shrink-0 ${
              activeView === 'compare' ? 'text-[#54212D] font-semibold border-b border-[#54212D] pb-0.5' : ''
            }`}
          >
            Compare
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`cursor-pointer transition-colors hover:text-[#54212D] whitespace-nowrap shrink-0 ${
              activeView === 'about' ? 'text-[#54212D] font-semibold border-b border-[#54212D] pb-0.5' : ''
            }`}
          >
            About
          </button>
        </nav>

        {/* Zone 3: Actions & Bag */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="View Wishlist"
            className="p-2 text-[#291F1C] hover:text-[#54212D] transition-colors relative cursor-pointer"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#54212D] text-[#F6F1E9] text-[10px] font-medium rounded-full flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="View Shopping Bag"
            className="flex items-center gap-2 px-3 py-2 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-wider font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-semibold">({cartCount})</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-[#291F1C] hover:text-[#54212D] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F6F1E9] border-b border-[#D8CBBE] px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4 text-sm tracking-widest uppercase font-medium text-[#291F1C]">
            <button
              onClick={() => handleNavClick('shop')}
              className="text-left py-2 hover:text-[#54212D] border-b border-[#D8CBBE]/30"
            >
              Explore Collection
            </button>
            <button
              onClick={() => handleNavClick('scent-lab')}
              className="text-left py-2 hover:text-[#54212D] border-b border-[#D8CBBE]/30 flex items-center justify-between"
            >
              <span>The Scent Lab</span>
              <span className="text-[10px] bg-[#C7A778]/20 text-[#54212D] px-2 py-0.5">Interactive</span>
            </button>
            <button
              onClick={() => handleNavClick('quiz')}
              className="text-left py-2 hover:text-[#54212D] border-b border-[#D8CBBE]/30"
            >
              Fragrance Finder Quiz
            </button>
            <button
              onClick={() => handleNavClick('discovery-set')}
              className="text-left py-2 hover:text-[#54212D] border-b border-[#D8CBBE]/30"
            >
              Bespoke Discovery Trio
            </button>
            <button
              onClick={() => handleNavClick('compare')}
              className="text-left py-2 hover:text-[#54212D] border-b border-[#D8CBBE]/30"
            >
              Perfume Comparison
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 hover:text-[#54212D]"
            >
              About the Maison
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
