import React from 'react';
import { useShop } from '../context/ShopContext';
import { EDITORIAL_MOOD_IMAGE } from '../assets/images';
import { ImageWithFallback } from './ImageWithFallback';
import { Compass, Feather, Droplets, Sparkles } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const { setActiveView } = useShop();

  return (
    <section className="py-20 md:py-28 border-b border-[#D8CBBE]/60 bg-[#F6F1E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with natural aesthetic */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#D8CBBE]/80 shadow-lg">
              <ImageWithFallback
                src={EDITORIAL_MOOD_IMAGE}
                alt="Botanical dahlia and spice ingredients in rainwater mist"
                fallbackTitle="Botanical Essence"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#54212D]/10 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Editorial Philosophy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#54212D] font-medium">
              <span className="w-5 h-px bg-[#C7A778]" />
              <span>The Maison Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#291F1C] leading-tight text-balance">
              More Than a Fragrance. <br />
              <span className="italic font-normal text-[#54212D]">A Signature.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#291F1C]/80 font-normal leading-relaxed">
              At ScentStory, we believe fragrance is the most intimate form of memory. Long after words fade, a trace of petrichor, smoky vanilla, or sun-warmed amber recalls a time, an embrace, or a distant horizon with startling clarity.
            </p>

            <p className="text-sm sm:text-base text-[#291F1C]/70 leading-relaxed">
              Each of our twenty original formulations is developed in collaboration with master noses in Grasse, using sustainably harvested raw essences. We do not design for trends; we compose evocative chapters meant to linger on warm skin and whisper your unspoken truth.
            </p>

            {/* Three Pillar Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="space-y-2 border-l border-[#C7A778]/50 pl-4">
                <Feather className="w-4 h-4 text-[#54212D]" />
                <h3 className="font-serif text-lg text-[#291F1C]">Distinct Persona</h3>
                <p className="text-xs text-[#291F1C]/70 leading-normal">Each bottle embodies an unmistakable emotional chapter.</p>
              </div>

              <div className="space-y-2 border-l border-[#C7A778]/50 pl-4">
                <Droplets className="w-4 h-4 text-[#54212D]" />
                <h3 className="font-serif text-lg text-[#291F1C]">Artisan Extraction</h3>
                <p className="text-xs text-[#291F1C]/70 leading-normal">Formulated in high-concentration Eau de Parfum (20–25% oils).</p>
              </div>

              <div className="space-y-2 border-l border-[#C7A778]/50 pl-4">
                <Sparkles className="w-4 h-4 text-[#54212D]" />
                <h3 className="font-serif text-lg text-[#291F1C]">The Scent Lab</h3>
                <p className="text-xs text-[#291F1C]/70 leading-normal">Encouraging personal layering to fashion your unique aura.</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setActiveView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs uppercase tracking-widest text-[#54212D] font-medium pb-1 border-b border-[#54212D] hover:text-[#6e2d3b] transition-colors cursor-pointer"
              >
                Read Our Story & Ingredients →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
