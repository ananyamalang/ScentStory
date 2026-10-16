import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES } from '../data/perfumes';
import { Perfume, Mood, Intensity, Occasion } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Eye } from 'lucide-react';

interface QuizAnswers {
  mood?: Mood;
  occasion?: Occasion;
  intensity?: Intensity;
  maxBudget?: number;
  season?: string;
}

export const FragranceQuiz: React.FC = () => {
  const { setSelectedPerfume, addToCart } = useShop();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [results, setResults] = useState<{ perfume: Perfume; score: number; reason: string }[] | null>(null);

  const questions = [
    {
      id: 'mood',
      title: 'What olfactory mood resonates with you today?',
      subtitle: 'Select the primary sensory atmosphere you wish to experience.',
      options: [
        { label: 'Fresh and Clean', desc: 'Crisp breezes, dewy greenery, and morning rain', value: 'Fresh and Clean' },
        { label: 'Warm and Woody', desc: 'Sun-warmed timber, amber, and fireside resonance', value: 'Warm and Woody' },
        { label: 'Floral and Romantic', desc: 'Delicate petals, orange blossoms, and poetic intimacy', value: 'Floral and Romantic' },
        { label: 'Sweet and Sensual', desc: 'Ripe stone fruit, dark cherries, and spun silk', value: 'Sweet and Sensual' },
        { label: 'Aquatic and Airy', desc: 'Oceanic ozone, coastal spray, and marine driftwood', value: 'Aquatic and Airy' },
        { label: 'Deep and Mysterious', desc: 'Moonlit waters, smoked resins, and dark shadows', value: 'Deep and Mysterious' }
      ]
    },
    {
      id: 'occasion',
      title: 'When do you primarily envision wearing this fragrance?',
      subtitle: 'Your setting guides the character and aura of the creation.',
      options: [
        { label: 'Everyday Signature', desc: 'An effortless, personal aura for daily life and work', value: 'Everyday Signature' },
        { label: 'Evening & Gala', desc: 'Opulent, memorable occasions under twilight or candlelight', value: 'Evening & Gala' },
        { label: 'Intimate & Sensual', desc: 'Close-quarters connection and velvet whispered moments', value: 'Intimate & Sensual' },
        { label: 'Summer & Sunlit', desc: 'Warm coastal getaways, bright terraces, and linen days', value: 'Summer & Sunlit' },
        { label: 'Autumn & Winter Fireside', desc: 'Cool breezes, warm knitwear, and crackling hearths', value: 'Autumn & Winter Fireside' },
        { label: 'Rainy Days & Reflection', desc: 'Solitude, quiet coffee, and petrichor moments', value: 'Rainy Days & Reflection' }
      ]
    },
    {
      id: 'intensity',
      title: 'What level of presence and sillage do you prefer?',
      subtitle: 'How prominently should your scent trail introduce itself?',
      options: [
        { label: 'Subtle', desc: 'An intimate skin scent discovered only when drawn close', value: 'Subtle' },
        { label: 'Moderate', desc: 'A balanced, poised aura that accompanies you throughout the day', value: 'Moderate' },
        { label: 'Intense', desc: 'A rich, room-filling statement with captivating longevity', value: 'Intense' }
      ]
    },
    {
      id: 'budget',
      title: 'What is your preferred price point for a 50ml flacon?',
      subtitle: 'Every formulation is pure Eau de Parfum with no fillers.',
      options: [
        { label: 'Under $160', desc: 'Light, uplifting daily elixirs', value: 160 },
        { label: 'Under $185', desc: 'Rich artisanal extractions with botanical complexity', value: 185 },
        { label: 'Up to $220', desc: 'Rare vintage accords, oud, saffron, and aged resins', value: 220 }
      ]
    }
  ];

  const handleSelectOption = (field: keyof QuizAnswers, value: any) => {
    const updated = { ...answers, [field]: value };
    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResults(updated);
    }
  };

  const calculateResults = (finalAnswers: QuizAnswers) => {
    const scored = PERFUMES.map((perfume) => {
      let score = 50;
      let reasons: string[] = [];

      // Mood match (+35)
      if (finalAnswers.mood && perfume.mood === finalAnswers.mood) {
        score += 35;
        reasons.push(`harmonizes with your ${finalAnswers.mood} mood`);
      }

      // Occasion match (+25)
      if (finalAnswers.occasion && perfume.occasion === finalAnswers.occasion) {
        score += 25;
        reasons.push(`tailored for ${finalAnswers.occasion}`);
      }

      // Intensity match (+20)
      if (finalAnswers.intensity && perfume.intensity === finalAnswers.intensity) {
        score += 20;
        reasons.push(`delivers your preferred ${finalAnswers.intensity.toLowerCase()} presence`);
      }

      // Budget check
      if (finalAnswers.maxBudget && perfume.price50ml <= finalAnswers.maxBudget) {
        score += 10;
      } else if (finalAnswers.maxBudget && perfume.price50ml > finalAnswers.maxBudget) {
        score -= 20;
      }

      return {
        perfume,
        score: Math.min(99, Math.max(65, score)),
        reason: reasons.length > 0 ? `Selected because it ${reasons.join(' and ')}.` : 'Matches your sensory parameters and budget tier.'
      };
    });

    scored.sort((a, b) => b.score - a.score);
    setResults(scored.slice(0, 3));
  };

  const handleRetake = () => {
    setAnswers({});
    setResults(null);
    setStep(0);
  };

  return (
    <section className="py-12 md:py-20 bg-[#F6F1E9] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#54212D] font-medium">
            <Sparkles className="w-4 h-4 text-[#C7A778]" />
            <span>Curated Olfactory Diagnostic</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#291F1C]">
            Fragrance Finder Quiz
          </h1>
          <p className="text-sm sm:text-base text-[#291F1C]/75 font-light max-w-xl mx-auto">
            Answer four intuitive questions to discover which creations from our twenty original flacons align with your persona.
          </p>
        </div>

        {/* Results View */}
        {results ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#EFE9DF] border border-[#D8CBBE] p-6 text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#54212D] font-medium">
                Your Bespoke Selection
              </span>
              <h2 className="font-serif text-3xl text-[#291F1C]">
                Three Fragrances Chosen for You
              </h2>
              <p className="text-xs text-[#291F1C]/70">
                Grounded in your preferred {answers.mood} aura and {answers.occasion} setting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map(({ perfume, score, reason }) => (
                <div
                  key={perfume.id}
                  className="bg-[#F6F1E9] border border-[#D8CBBE] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-mono text-[#54212D] font-semibold">{score}% Affinity</span>
                      <span className="text-[#291F1C]/60 uppercase">{perfume.mood}</span>
                    </div>

                    <div className="aspect-[4/3] overflow-hidden bg-[#291F1C]/5 mb-4 border border-[#D8CBBE]/60">
                      <ImageWithFallback
                        src={perfume.image}
                        alt={perfume.name}
                        fallbackTitle={perfume.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="font-serif text-2xl text-[#291F1C] mb-1">{perfume.name}</h3>
                    <p className="text-xs italic text-[#C7A778] mb-2 font-serif">"{perfume.tagline}"</p>
                    <p className="text-xs text-[#291F1C]/75 leading-relaxed mb-4">{reason}</p>

                    <div className="pt-3 border-t border-[#D8CBBE]/60 text-xs text-[#291F1C]/70 space-y-1">
                      <p><strong className="text-[#54212D]">Top:</strong> {perfume.topNotes.slice(0, 2).join(', ')}</p>
                      <p><strong className="text-[#54212D]">Base:</strong> {perfume.baseNotes.slice(0, 2).join(', ')}</p>
                    </div>
                  </div>

                  <div className="pt-6 space-y-2">
                    <div className="flex items-center justify-between text-xs mb-1 font-mono">
                      <span>50ml Flacon</span>
                      <span className="font-semibold text-sm tabular-nums">${perfume.price50ml}</span>
                    </div>

                    <button
                      onClick={() => setSelectedPerfume(perfume)}
                      className="w-full py-2.5 px-4 bg-[#F6F1E9] border border-[#54212D] text-[#54212D] hover:bg-[#54212D] hover:text-[#F6F1E9] text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Full Profile</span>
                    </button>

                    <button
                      onClick={() => addToCart(perfume, '50ml', 1)}
                      className="w-full py-2.5 px-4 bg-[#54212D] text-[#F6F1E9] hover:bg-[#6e2d3b] text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-6">
              <button
                onClick={handleRetake}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#54212D] font-medium border-b border-[#54212D] pb-1 hover:text-[#6e2d3b] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Diagnostic Quiz</span>
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Question Step Card */
          <div className="bg-[#F6F1E9] border border-[#D8CBBE] p-6 sm:p-10 shadow-lg">
            
            {/* Progress indicators */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D8CBBE]/60 text-xs text-[#291F1C]/70">
              <span className="uppercase tracking-widest font-medium text-[#54212D]">
                Step {step + 1} of {questions.length}
              </span>
              <div className="flex gap-1.5">
                {questions.map((_, i) => (
                  <span
                    key={i}
                    className={`w-6 h-1 transition-colors ${
                      i <= step ? 'bg-[#54212D]' : 'bg-[#D8CBBE]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#291F1C] font-light mb-2">
                {questions[step].title}
              </h2>
              <p className="text-xs sm:text-sm text-[#291F1C]/70">
                {questions[step].subtitle}
              </p>
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[step].options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleSelectOption(questions[step].id as any, option.value)}
                  className="text-left p-5 border border-[#D8CBBE] hover:border-[#54212D] bg-[#F6F1E9] hover:bg-[#EFE9DF] transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-serif text-xl text-[#291F1C] group-hover:text-[#54212D] transition-colors mb-1">
                      {option.label}
                    </h3>
                    <p className="text-xs text-[#291F1C]/70 leading-relaxed font-light">
                      {option.desc}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-end text-[#54212D] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>

            {/* Back button if past step 0 */}
            {step > 0 && (
              <div className="pt-6 mt-6 border-t border-[#D8CBBE]/50">
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-xs uppercase tracking-wider text-[#291F1C]/70 hover:text-[#291F1C] cursor-pointer"
                >
                  ← Back to Previous Question
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
