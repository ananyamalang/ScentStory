import React from 'react';
import { useShop } from '../context/ShopContext';
import { HERO_IMAGE } from '../assets/images';
import { ImageWithFallback } from './ImageWithFallback';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveView } = useShop();

  return (
    <section className="relative overflow-hidden border-b border-[#D8CBBE]/60 bg-[#F6F1E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#54212D] font-medium">
              <span className="w-6 h-px bg-[#C7A778]" />
              <span>Haute Parfumerie & Olfactory Memory</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.08] text-[#291F1C] font-light tracking-tight text-balance">
              Some Things Are Best Remembered by Their Scent.
            </h1>

            <p className="text-base sm:text-lg text-[#291F1C]/75 font-normal leading-relaxed max-w-xl">
              Discover fragrances that capture a feeling, a place, a memory, and everything words cannot quite express.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button
                onClick={() => {
                  setActiveView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer shadow-sm group"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  setActiveView('scent-lab');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-[#54212D]/40 text-[#54212D] text-xs uppercase tracking-widest font-medium hover:bg-[#54212D]/5 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C7A778]" />
                <span>Enter the Scent Lab</span>
              </button>
            </div>

            {/* Editorial highlights strip */}
            <div className="pt-8 border-t border-[#D8CBBE]/60 grid grid-cols-3 gap-6 text-[#291F1C]">
              <div>
                <p className="font-serif text-2xl lg:text-3xl font-light text-[#54212D]">20</p>
                <p className="text-xs uppercase tracking-wider text-[#291F1C]/70 mt-1 font-medium">Original Flacons</p>
              </div>
              <div>
                <p className="font-serif text-2xl lg:text-3xl font-light text-[#54212D]">100%</p>
                <p className="text-xs uppercase tracking-wider text-[#291F1C]/70 mt-1 font-medium">Grasse Absolutes</p>
              </div>
              <div>
                <p className="font-serif text-2xl lg:text-3xl font-light text-[#54212D]">Bespoke</p>
                <p className="text-xs uppercase tracking-wider text-[#291F1C]/70 mt-1 font-medium">Layering Studio</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden shadow-2xl border border-[#D8CBBE]/70 bg-[#291F1C]">
              <ImageWithFallback
                src={HERO_IMAGE}
                alt="ScentStory Aurora Eau de Parfum resting on warm travertine stone"
                fallbackTitle="ScentStory Signature Flacon"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#291F1C]/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-[#F6F1E9]">
                <p className="text-[11px] tracking-widest uppercase text-[#C7A778] font-medium">Maison Signature</p>
                <p className="font-serif text-2xl font-light tracking-wide mt-1">Eau de Parfum Edition</p>
                <p className="text-xs text-[#F6F1E9]/80 mt-1 font-light">Formulated in small numbered batches</p>
              </div>
            </div>

            {/* Decorative subtle framing accent */}
            <div className="hidden sm:block absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-[#C7A778]/40 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
