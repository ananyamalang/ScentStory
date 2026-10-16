import React from 'react';
import { useShop } from '../context/ShopContext';
import { DISCOVERY_SET_IMAGE } from '../assets/images';
import { ImageWithFallback } from './ImageWithFallback';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export const DiscoverySetPreview: React.FC = () => {
  const { setActiveView } = useShop();

  return (
    <section className="py-20 md:py-28 border-b border-[#D8CBBE]/60 bg-[#F6F1E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Left */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#54212D] font-medium">
              <Sparkles className="w-4 h-4 text-[#C7A778]" />
              <span>Three Scents · Zero Hesitation</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#291F1C] leading-tight text-balance">
              The Bespoke Discovery Trio
            </h2>

            <p className="text-base sm:text-lg text-[#291F1C]/80 font-light leading-relaxed">
              Choosing a signature fragrance online shouldn't feel like a leap in the dark. Select any three 10ml travel flacons from our twenty original creations, encased in our embossed linen box for $65.
            </p>

            <div className="space-y-3 pt-2 text-xs text-[#291F1C]/80">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#54212D] shrink-0" />
                <span>Choose any 3 original perfumes — no restrictions.</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#54212D] shrink-0" />
                <span>Includes a $25 credit toward your subsequent 50ml or 100ml grand flacon.</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#54212D] shrink-0" />
                <span>Complimentary tracked shipping included.</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button
                onClick={() => {
                  setActiveView('discovery-set');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer shadow-sm group"
              >
                <span>Curate Your 3-Vial Set</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  setActiveView('gift-finder');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#54212D]/40 text-[#54212D] text-xs uppercase tracking-widest font-medium hover:bg-[#54212D]/5 transition-all cursor-pointer"
              >
                <span>Gifting a Set?</span>
              </button>
            </div>
          </div>

          {/* Image Right */}
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden border border-[#D8CBBE] shadow-xl bg-[#291F1C]/5">
              <ImageWithFallback
                src={DISCOVERY_SET_IMAGE}
                alt="Bespoke fragrance discovery set with three glass vials in luxury box"
                fallbackTitle="Discovery Trio Set"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
