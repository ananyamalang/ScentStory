import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES, MOODS } from '../data/perfumes';
import { Perfume, Mood, Intensity } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Gift, Sparkles, ShoppingBag, Eye, Heart, ArrowRight } from 'lucide-react';

export const GiftFinder: React.FC = () => {
  const { setSelectedPerfume, addToCart, showToast } = useShop();

  const [recipient, setRecipient] = useState<string>('Partner / Significant Other');
  const [occasion, setOccasion] = useState<string>('Birthday or Anniversary');
  const [preferredMood, setPreferredMood] = useState<string>('Warm and Woody');
  const [intensity, setIntensity] = useState<string>('Moderate');
  const [budget, setBudget] = useState<number>(200);
  const [giftNote, setGiftNote] = useState<string>('For someone unforgettable. May every spray remind you of warmth and beauty.');

  // Find best matched gift perfumes from real catalogue
  const recommendations = PERFUMES.filter((p) => {
    return p.price50ml <= budget;
  })
    .map((perfume) => {
      let score = 50;
      if (perfume.mood === preferredMood) score += 30;
      if (perfume.intensity === intensity) score += 15;
      if (perfume.bestSeller) score += 10;
      return { perfume, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  return (
    <section className="py-12 md:py-20 bg-[#F6F1E9] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#54212D] font-medium">
            <Gift className="w-4 h-4 text-[#C7A778]" />
            <span>The Gift Atelier</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#291F1C]">
            Smart Fragrance Gift Concierge
          </h1>
          <p className="text-sm sm:text-base text-[#291F1C]/75 font-light leading-relaxed">
            Finding a signature scent for someone special requires care. Specify their persona and occasion below to receive curated recommendations accompanied by bespoke calligraphy gift packaging.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Left */}
          <div className="lg:col-span-5 bg-[#EFE9DF] border border-[#D8CBBE] p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="font-serif text-2xl text-[#291F1C] pb-3 border-b border-[#D8CBBE]">
              Gift Parameters
            </h2>

            {/* Recipient */}
            <div>
              <label htmlFor="recipient-select" className="text-xs uppercase tracking-wider font-medium text-[#291F1C] block mb-2">
                Who is this gift for?
              </label>
              <select
                id="recipient-select"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-2.5 bg-[#F6F1E9] border border-[#D8CBBE] text-xs text-[#291F1C] focus:outline-none focus:border-[#54212D] cursor-pointer"
              >
                <option value="Partner / Significant Other">Partner / Significant Other</option>
                <option value="Close Friend">Close Friend</option>
                <option value="Parent / Family Member">Parent / Family Member</option>
                <option value="Colleague / Mentor">Colleague / Mentor</option>
                <option value="Self-Indulgence / Personal Reward">Self-Indulgence / Personal Reward</option>
              </select>
            </div>

            {/* Occasion */}
            <div>
              <label htmlFor="occasion-select" className="text-xs uppercase tracking-wider font-medium text-[#291F1C] block mb-2">
                The Celebration
              </label>
              <select
                id="occasion-select"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full p-2.5 bg-[#F6F1E9] border border-[#D8CBBE] text-xs text-[#291F1C] focus:outline-none focus:border-[#54212D] cursor-pointer"
              >
                <option value="Birthday or Anniversary">Birthday or Anniversary</option>
                <option value="Holiday Celebration">Holiday Celebration</option>
                <option value="Milestone / Promotion">Milestone / Promotion</option>
                <option value="Heartfelt Thank You">Heartfelt Thank You</option>
              </select>
            </div>

            {/* Preferred Mood */}
            <div>
              <label htmlFor="preferred-mood-select" className="text-xs uppercase tracking-wider font-medium text-[#291F1C] block mb-2">
                Their Olfactory Aura
              </label>
              <select
                id="preferred-mood-select"
                value={preferredMood}
                onChange={(e) => setPreferredMood(e.target.value)}
                className="w-full p-2.5 bg-[#F6F1E9] border border-[#D8CBBE] text-xs text-[#291F1C] focus:outline-none focus:border-[#54212D] cursor-pointer"
              >
                {MOODS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label} ({m.badge})
                  </option>
                ))}
              </select>
            </div>

            {/* Intensity */}
            <div>
              <label className="text-xs uppercase tracking-wider font-medium text-[#291F1C] block mb-2">
                Their Sillage Style
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['Subtle', 'Moderate', 'Intense'].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setIntensity(style)}
                    className={`p-2 border text-center transition-all cursor-pointer ${
                      intensity === style
                        ? 'border-[#54212D] bg-[#54212D] text-[#F6F1E9] font-medium'
                        : 'border-[#D8CBBE] bg-[#F6F1E9] text-[#291F1C]'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="uppercase tracking-wider font-medium text-[#291F1C]">Budget Ceiling</span>
                <span className="font-mono font-semibold text-[#54212D] tabular-nums">${budget}</span>
              </div>
              <input
                type="range"
                min="150"
                max="250"
                step="10"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[#54212D] cursor-pointer"
              />
            </div>

            {/* Personalized Gift Message Note */}
            <div>
              <label htmlFor="gift-note-textarea" className="text-xs uppercase tracking-wider font-medium text-[#291F1C] block mb-2">
                Calligraphy Gift Card Note (Included)
              </label>
              <textarea
                id="gift-note-textarea"
                rows={3}
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full p-2.5 bg-[#F6F1E9] border border-[#D8CBBE] text-xs text-[#291F1C] focus:outline-none focus:border-[#54212D]"
              />
              <span className="text-[10px] text-[#291F1C]/60 block mt-1">
                Handwritten with archival black ink on heavy cotton parchment.
              </span>
            </div>

          </div>

          {/* Recommendations Right */}
          <div className="lg:col-span-7 space-y-6">
            <div className="pb-3 border-b border-[#D8CBBE] flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#54212D] font-medium">
                  Curated Match
                </span>
                <h3 className="font-serif text-2xl text-[#291F1C]">Recommended Gift Selections</h3>
              </div>
              <span className="text-xs text-[#291F1C]/60">Fits ${budget} budget</span>
            </div>

            <div className="space-y-6">
              {recommendations.map(({ perfume }) => (
                <div
                  key={perfume.id}
                  className="bg-[#F6F1E9] border border-[#D8CBBE] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-center"
                >
                  <div className="w-full sm:w-44 aspect-[3/4] overflow-hidden bg-[#291F1C]/5 border border-[#D8CBBE]/60 shrink-0">
                    <ImageWithFallback
                      src={perfume.image}
                      alt={perfume.name}
                      fallbackTitle={perfume.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="uppercase tracking-widest text-[#54212D] font-medium">
                        {perfume.fragranceFamily}
                      </span>
                      <span className="font-mono text-base font-semibold text-[#291F1C] tabular-nums">
                        ${perfume.price50ml}
                      </span>
                    </div>

                    <h4 className="font-serif text-2xl text-[#291F1C]">{perfume.name}</h4>
                    <p className="text-xs italic text-[#C7A778] font-serif">"{perfume.tagline}"</p>
                    
                    <p className="text-xs text-[#291F1C]/75 leading-relaxed">
                      {perfume.description}
                    </p>

                    <div className="p-3 bg-[#EFE9DF]/60 border-l-2 border-[#54212D] text-[11px] text-[#291F1C]/80">
                      <strong>Why this suits {recipient}:</strong> A nuanced {perfume.mood.toLowerCase()} creation that balances luxury, longevity, and timeless distinction.
                    </div>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedPerfume(perfume)}
                        className="py-2.5 px-4 bg-[#F6F1E9] border border-[#54212D] text-[#54212D] hover:bg-[#54212D] hover:text-[#F6F1E9] text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          addToCart(perfume, '50ml', 1);
                          showToast(`Gift edition of ${perfume.name} added to your bag`);
                        }}
                        className="py-2.5 px-5 bg-[#54212D] text-[#F6F1E9] hover:bg-[#6e2d3b] text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add Gift Flacon to Bag</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Gift presentation packaging preview card */}
            <div className="p-5 bg-[#EFE9DF] border border-[#D8CBBE] flex items-center gap-4">
              <Gift className="w-8 h-8 text-[#C7A778] shrink-0" />
              <div className="text-xs text-[#291F1C]/80">
                <strong className="block text-[#291F1C] uppercase tracking-wider mb-0.5">
                  Complimentary Maison Gift Wrapping
                </strong>
                Every gifted flacon arrives boxed in our signature ivory case tied with a deep burgundy grosgrain ribbon and your personalized card.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
