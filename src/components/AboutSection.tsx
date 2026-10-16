import React from 'react';
import { useShop } from '../context/ShopContext';
import { EDITORIAL_MOOD_IMAGE } from '../assets/images';
import { ImageWithFallback } from './ImageWithFallback';
import { Sparkles, Feather, Droplets, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { setActiveView } = useShop();

  return (
    <section className="py-16 md:py-24 bg-[#F6F1E9] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#54212D] font-medium">
            <span className="w-6 h-px bg-[#C7A778]" />
            <span>The Maison Manifesto</span>
            <span className="w-6 h-px bg-[#C7A778]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#291F1C] leading-tight">
            Every Scent Tells a Story.
          </h1>

          <p className="text-base sm:text-lg text-[#291F1C]/75 font-light leading-relaxed">
            We exist at the intersection of memory and art, crafting evocative perfumes that act as olfactory time capsules for life's most poetic moments.
          </p>
        </div>

        {/* Big visual banner */}
        <div className="aspect-[16/9] w-full overflow-hidden border border-[#D8CBBE] shadow-xl relative bg-[#291F1C]">
          <ImageWithFallback
            src={EDITORIAL_MOOD_IMAGE}
            alt="Artisanal perfume bottles in natural botanical setting"
            fallbackTitle="Maison Fragrance Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#291F1C]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-[#F6F1E9]">
            <p className="text-xs uppercase tracking-widest text-[#C7A778] font-medium">Bespoke Atelier</p>
            <p className="font-serif text-2xl font-light">Crafted in collaboration with master noses in Grasse, France.</p>
          </div>
        </div>

        {/* Three Editorial Essays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[#291F1C]/80 text-sm sm:text-base leading-relaxed font-light">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#291F1C] font-normal">
              Olfaction & The Architecture of Memory
            </h2>
            <p>
              The olfactory bulb connects directly to the limbic system — the cerebral sanctuary of emotion and nostalgia. While sight and sound pass through conscious filters, a fragrance triggers immediate emotional resonance.
            </p>
            <p>
              When developing ScentStory, our intention was never to produce generic mass-market florals or synthetic amber bombs. Instead, we sought to capture distinct emotional landscapes: the crisp mineral petrichor of a summer downpour on warm slate in <em>After the Rain</em>, the golden calm of twilight over the Mediterranean in <em>Golden Hour</em>, or the timeless quietude of ancient books in <em>Forbidden Pages</em>.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#291F1C] font-normal">
              The Philosophy of the Scent Lab
            </h2>
            <p>
              Fragrance is not a static uniform; it is an evolving expression of your mood and presence. We pioneered <strong>The Scent Lab</strong> discovery studio to empower fragrance lovers to become co-creators.
            </p>
            <p>
              By pairing harmonizing accords — such as layering the refreshing marine ozone of <em>Ocean Letters</em> over the deep sun-bleached cedar of <em>Driftwood</em> — you craft an aura entirely your own, ensuring no one in the room ever smells quite like you.
            </p>
          </div>
        </div>

        {/* Guiding Principles */}
        <div className="p-8 bg-[#EFE9DF] border border-[#D8CBBE] space-y-6">
          <h3 className="font-serif text-2xl text-[#291F1C] text-center">
            Our Formulation Standards
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#291F1C]/80">
            <div className="space-y-2">
              <span className="font-semibold text-[#54212D] block uppercase tracking-wider">
                01. True Eau de Parfum
              </span>
              <p>Formulated at 20–25% pure essence concentration, ensuring 8–10 hours of natural skin evolution without synthetic fixatives.</p>
            </div>
            <div className="space-y-2">
              <span className="font-semibold text-[#54212D] block uppercase tracking-wider">
                02. Ethical Botanicals
              </span>
              <p>Hand-harvested Tunisian neroli, Calabrian bergamot, and Bulgarian rose petals sourced directly with fair-trade farming cooperatives.</p>
            </div>
            <div className="space-y-2">
              <span className="font-semibold text-[#54212D] block uppercase tracking-wider">
                03. Zero Fabrications
              </span>
              <p>Transparent note profiles, genuine bottle sizes, and clear communication. Every perfume card reflects authentic notes and character.</p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="text-center pt-6">
          <button
            onClick={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer shadow-sm"
          >
            Explore the 20 Atelier Fragrances
          </button>
        </div>

      </div>
    </section>
  );
};
