import React from 'react';
import { useShop } from '../context/ShopContext';
import { MOODS } from '../data/perfumes';
import { ArrowUpRight } from 'lucide-react';

export const ExploreMoods: React.FC = () => {
  const { setActiveView, setSelectedMoodFilter } = useShop();

  const handleMoodSelect = (moodId: string) => {
    setSelectedMoodFilter(moodId);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-24 border-b border-[#D8CBBE]/60 bg-[#F6F1E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#54212D] font-medium mb-2">
              Curated Moods
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#291F1C]">
              Explore by Olfactory Mood
            </h2>
          </div>
          <p className="text-sm text-[#291F1C]/70 max-w-md font-normal">
            Choose the atmosphere you wish to evoke today. Each category opens our verified formulations attuned to that emotional resonance.
          </p>
        </div>

        {/* 6 Mood Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOODS.map((mood, idx) => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood.id)}
              className="group text-left p-8 bg-[#F6F1E9] hover:bg-[#291F1C] border border-[#D8CBBE] hover:border-[#291F1C] transition-all duration-300 relative flex flex-col justify-between min-h-[220px] cursor-pointer shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#54212D] group-hover:text-[#C7A778] transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="text-[11px] tracking-wider uppercase text-[#291F1C]/60 group-hover:text-[#F6F1E9]/60 transition-colors">
                    {mood.badge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl lg:text-3xl text-[#291F1C] group-hover:text-[#F6F1E9] transition-colors mb-3">
                  {mood.label}
                </h3>

                <p className="text-xs sm:text-sm text-[#291F1C]/70 group-hover:text-[#F6F1E9]/80 transition-colors leading-relaxed">
                  {mood.subtitle}
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between border-t border-[#D8CBBE]/40 group-hover:border-[#F6F1E9]/20 transition-colors">
                <span className="text-xs uppercase tracking-widest text-[#54212D] group-hover:text-[#C7A778] font-medium transition-colors">
                  View Scents
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#54212D] group-hover:text-[#C7A778] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
