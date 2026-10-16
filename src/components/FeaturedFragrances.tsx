import React from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES } from '../data/perfumes';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

export const FeaturedFragrances: React.FC = () => {
  const { setActiveView } = useShop();

  // Highlight 6 key original fragrances
  const featuredList = PERFUMES.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-20 md:py-28 border-b border-[#D8CBBE]/60 bg-[#F6F1E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#54212D] font-medium mb-2">
              Maison Signatures
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#291F1C]">
              Featured Fragrances
            </h2>
          </div>
          
          <button
            onClick={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#54212D] font-medium hover:text-[#6e2d3b] pb-1 border-b border-[#54212D] cursor-pointer self-start md:self-auto transition-colors"
          >
            <span>View All 20 Creations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredList.map((perfume) => (
            <ProductCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

      </div>
    </section>
  );
};
