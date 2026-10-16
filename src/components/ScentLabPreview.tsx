import React from 'react';
import { useShop } from '../context/ShopContext';
import { SCENT_LAB_IMAGE } from '../assets/images';
import { ImageWithFallback } from './ImageWithFallback';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';

export const ScentLabPreview: React.FC = () => {
  const { setActiveView } = useShop();

  return (
    <section className="py-20 md:py-28 border-b border-[#D8CBBE]/60 bg-[#EFE9DF]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Left */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] overflow-hidden border border-[#D8CBBE] shadow-xl bg-[#291F1C]/5">
              <ImageWithFallback
                src={SCENT_LAB_IMAGE}
                alt="Artisan fragrance blending studio with perfume bottles and botanicals"
                fallbackTitle="The Scent Lab Blending Studio"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="hidden sm:block absolute -bottom-6 -right-6 p-4 bg-[#F6F1E9] border border-[#D8CBBE] shadow-lg max-w-xs text-xs">
              <span className="text-[#54212D] font-semibold block uppercase tracking-wider mb-1">
                Layering Masterclass
              </span>
              <p className="text-[#291F1C]/75 font-light">
                Discover how Golden Hour + After the Rain form a sunlit petrichor aura.
              </p>
            </div>
          </div>

          {/* Copy Right */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#54212D] font-medium">
              <Layers className="w-4 h-4 text-[#C7A778]" />
              <span>Interactive Fragrance Discovery</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#291F1C] leading-tight text-balance">
              The Scent Lab: <br />
              <span className="italic font-normal text-[#54212D]">The Art of Fragrance Layering</span>
            </h2>

            <p className="text-base sm:text-lg text-[#291F1C]/80 font-light leading-relaxed">
              Why wear a single narrative when you can weave two together? The Scent Lab allows you to select any pair from our catalogue to analyze shared botanical notes, complementary accords, and step-by-step application order.
            </p>

            <div className="space-y-3 text-xs text-[#291F1C]/80 pt-2">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#54212D] mt-1.5 shrink-0" />
                <span>Real-time harmony analysis comparing top, heart, and base chords.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#54212D] mt-1.5 shrink-0" />
                <span>Curated master recipes crafted by Grasse perfumers.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#54212D] mt-1.5 shrink-0" />
                <span>Step-by-step pulse point layering guidance.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setActiveView('scent-lab');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer shadow-sm group"
              >
                <span>Enter The Scent Lab</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
