/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { FeaturedFragrances } from './components/FeaturedFragrances';
import { ExploreMoods } from './components/ExploreMoods';
import { ScentLabPreview } from './components/ScentLabPreview';
import { DiscoverySetPreview } from './components/DiscoverySetPreview';
import { ShopCatalog } from './components/ShopCatalog';
import { ScentLab } from './components/ScentLab';
import { FragranceQuiz } from './components/FragranceQuiz';
import { DiscoverySetBuilder } from './components/DiscoverySetBuilder';
import { PerfumeComparison } from './components/PerfumeComparison';
import { GiftFinder } from './components/GiftFinder';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Check } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeView, selectedPerfume, setSelectedPerfume, toastMessage } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E9] text-[#291F1C]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <BrandStory />
            <FeaturedFragrances />
            <ExploreMoods />
            <ScentLabPreview />
            <DiscoverySetPreview />
          </>
        )}

        {activeView === 'shop' && <ShopCatalog />}
        {activeView === 'scent-lab' && <ScentLab />}
        {activeView === 'quiz' && <FragranceQuiz />}
        {activeView === 'discovery-set' && <DiscoverySetBuilder />}
        {activeView === 'compare' && <PerfumeComparison />}
        {activeView === 'gift-finder' && <GiftFinder />}
        {activeView === 'about' && <AboutSection />}
      </main>

      {/* Global Luxury Footer */}
      <Footer />

      {/* Product Detail Modal */}
      {selectedPerfume && (
        <ProductDetailModal
          perfume={selectedPerfume}
          onClose={() => setSelectedPerfume(null)}
        />
      )}

      {/* Cart & Wishlist Drawers */}
      <CartDrawer />
      <WishlistDrawer />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#291F1C] text-[#F6F1E9] border border-[#C7A778]/50 px-5 py-3 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200 text-xs">
          <span className="w-5 h-5 rounded-full bg-[#54212D] flex items-center justify-center text-[#F6F1E9] shrink-0">
            <Check className="w-3 h-3 stroke-[2.5]" />
          </span>
          <span className="font-light">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
