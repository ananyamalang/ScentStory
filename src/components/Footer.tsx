import React, { useState } from 'react';
import { useShop, ActiveView } from '../context/ShopContext';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setIsWishlistOpen, setIsCartOpen, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNav = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    showToast('Thank you for subscribing to ScentStory gazette');
  };

  return (
    <footer className="bg-[#291F1C] text-[#F6F1E9] border-t border-[#291F1C]">
      
      {/* Closing CTA Callout Section */}
      <div className="border-b border-[#F6F1E9]/10 py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-xs uppercase tracking-widest text-[#C7A778] font-medium">
            Begin Your Chapter
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F6F1E9]">
            Your Next Signature Scent Is Waiting.
          </h2>
          <p className="text-sm sm:text-base text-[#F6F1E9]/70 max-w-xl mx-auto font-light leading-relaxed">
            From the crisp petrichor of After the Rain to the honeyed twilight of Golden Hour, uncover the fragrance composed for your memory.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleNav('shop')}
              className="px-8 py-4 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer shadow-sm flex items-center gap-2"
            >
              <span>Explore the Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNav('discovery-set')}
              className="px-8 py-4 border border-[#C7A778]/50 text-[#C7A778] hover:bg-[#C7A778]/10 text-xs uppercase tracking-widest font-medium transition-all cursor-pointer"
            >
              Build Discovery Trio ($65)
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="text-left font-serif text-3xl tracking-tight text-[#F6F1E9] hover:text-[#C7A778] transition-colors"
            >
              ScentStory
            </button>
            <p className="italic font-serif text-base text-[#C7A778]">
              Every Scent Tells a Story.
            </p>
            <p className="text-xs text-[#F6F1E9]/70 max-w-sm leading-relaxed font-light">
              Haute parfumerie inspired by evocative literature, memory, and nature. Hand-poured in numbered flacons in Grasse, France.
            </p>

            {/* Newsletter input */}
            <form onSubmit={handleNewsletter} className="pt-2 max-w-sm">
              <label htmlFor="newsletter-email-input" className="text-[11px] uppercase tracking-wider text-[#F6F1E9]/80 block mb-2 font-medium">
                The ScentStory Gazette
              </label>
              {subscribed ? (
                <div className="text-xs text-[#C7A778] flex items-center gap-1.5 py-2">
                  <Check className="w-4 h-4" />
                  <span>You are on our private reserve list.</span>
                </div>
              ) : (
                <div className="flex">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-[#F6F1E9]/10 border border-[#F6F1E9]/20 px-3 py-2 text-xs text-[#F6F1E9] placeholder-[#F6F1E9]/40 focus:outline-none focus:border-[#C7A778]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-wider font-medium hover:bg-[#6e2d3b] transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Navigation Links Column 1 */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C7A778] font-medium mb-4">
              Explore
            </p>
            <ul className="space-y-2.5 text-xs text-[#F6F1E9]/70 font-light">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#F6F1E9] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-[#F6F1E9] transition-colors cursor-pointer"
                >
                  Shop All 20 Scents
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('scent-lab')}
                  className="hover:text-[#F6F1E9] transition-colors cursor-pointer"
                >
                  The Scent Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quiz')}
                  className="hover:text-[#F6F1E9] transition-colors cursor-pointer"
                >
                  Fragrance Finder Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('discovery-set')}
                  className="hover:text-[#F6F1E9] transition-colors cursor-pointer"
                >
                  Bespoke Discovery Trio
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Links Column 2 */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C7A778] font-medium mb-4">
              Experience
            </p>
            <ul className="space-y-2.5 text-xs text-[#F6F1E9]/70 font-light">
              <li>
                <button
                  onClick={() => handleNav('compare')}
                  className="hover:text-[#F6F1E9] transition-colors cursor-pointer"
                >
                  Compare Fragrances
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gift-finder')}
                  className="hover:text-[#F6F1E9] transition-colors cursor-pointer"
                >
                  Smart Gift Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="hover:text-[#F6F1E9] transition-colors cursor-pointer"
                >
                  Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="hover:text-[#F6F1E9] transition-colors cursor-pointer"
                >
                  Shopping Bag
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#F6F1E9] transition-colors cursor-pointer"
                >
                  About the Maison
                </button>
              </li>
            </ul>
          </div>

          {/* Transparency & Standards Column */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C7A778] font-medium mb-4">
              Commitment
            </p>
            <ul className="space-y-2.5 text-xs text-[#F6F1E9]/70 font-light">
              <li>Grasse Botanical Extractions</li>
              <li>Small Batch Maturation</li>
              <li>No Phthalates or Synthetic Dyes</li>
              <li>Cruelty-Free & Vegan Accords</li>
              <li>Complimentary Tracked Delivery</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-12 mt-12 border-t border-[#F6F1E9]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F6F1E9]/50">
          <p>© {new Date().getFullYear()} ScentStory Parfums. All original fragrance formulations preserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Grasse · Paris · New York</span>
            <span aria-hidden="true">·</span>
            <span>Every Scent Tells a Story</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
