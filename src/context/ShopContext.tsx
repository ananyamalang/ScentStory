import React, { createContext, useContext, useState, useEffect } from 'react';
import { Perfume, CartItem } from '../types';
import { PERFUMES } from '../data/perfumes';

export type ActiveView =
  | 'home'
  | 'shop'
  | 'scent-lab'
  | 'quiz'
  | 'discovery-set'
  | 'compare'
  | 'gift-finder'
  | 'about';

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  activeView: ActiveView;
  selectedPerfume: Perfume | null;
  comparisonList: Perfume[];
  selectedMoodFilter: string | null;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  toastMessage: string | null;
  
  // Actions
  setActiveView: (view: ActiveView) => void;
  setSelectedPerfume: (perfume: Perfume | null) => void;
  setSelectedMoodFilter: (mood: string | null) => void;
  addToCart: (perfume: Perfume, size: '50ml' | '100ml', quantity?: number) => void;
  addDiscoverySetToCart: (items: Perfume[]) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  toggleWishlist: (perfumeId: string) => void;
  isInWishlist: (perfumeId: string) => boolean;
  addToComparison: (perfume: Perfume) => void;
  removeFromComparison: (perfumeId: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  showToast: (msg: string) => void;
  cartCount: number;
  cartSubtotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('scentstory_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist with localStorage persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('scentstory_wishlist');
      return saved ? JSON.parse(saved) : ['after-the-rain', 'golden-hour'];
    } catch {
      return ['after-the-rain', 'golden-hour'];
    }
  });

  // Comparison list (up to 3 perfumes)
  const [comparisonList, setComparisonList] = useState<Perfume[]>([
    PERFUMES[0],
    PERFUMES[1]
  ]);

  useEffect(() => {
    try {
      localStorage.setItem('scentstory_cart', JSON.stringify(cart));
    } catch {
      // Storage error fallback
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('scentstory_wishlist', JSON.stringify(wishlist));
    } catch {
      // Storage error fallback
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const addToCart = (perfume: Perfume, size: '50ml' | '100ml', quantity = 1) => {
    const itemPrice = size === '50ml' ? perfume.price50ml : perfume.price100ml;
    const itemId = `${perfume.id}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          perfumeId: perfume.id,
          name: perfume.name,
          image: perfume.image,
          size,
          price: itemPrice,
          quantity
        }
      ];
    });

    showToast(`Added ${perfume.name} (${size}) to your bag`);
  };

  const addDiscoverySetToCart = (items: Perfume[]) => {
    if (items.length !== 3) return;
    const id = `discovery-set-${Date.now()}`;
    const names = items.map((i) => i.name).join(', ');

    setCart((prev) => [
      ...prev,
      {
        id,
        name: `Bespoke Discovery Trio (${names})`,
        image: '/src/assets/images/discovery_set_box_1792170766507.jpg',
        size: '3 x 10ml Eau de Parfum',
        price: 65,
        quantity: 1,
        isDiscoverySet: true,
        discoveryItems: items
      }
    ]);

    showToast('Bespoke Discovery Trio added to your bag');
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (perfumeId: string) => {
    const exists = wishlist.includes(perfumeId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== perfumeId));
      showToast('Removed from your wishlist');
    } else {
      setWishlist((prev) => [...prev, perfumeId]);
      showToast('Saved to your wishlist');
    }
  };

  const isInWishlist = (perfumeId: string) => wishlist.includes(perfumeId);

  const addToComparison = (perfume: Perfume) => {
    if (comparisonList.some((p) => p.id === perfume.id)) {
      showToast(`${perfume.name} is already in comparison`);
      return;
    }
    if (comparisonList.length >= 3) {
      showToast('Comparison limited to 3 fragrances. Remove one first.');
      return;
    }
    setComparisonList((prev) => [...prev, perfume]);
    showToast(`Added ${perfume.name} to comparison`);
  };

  const removeFromComparison = (perfumeId: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== perfumeId));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        activeView,
        selectedPerfume,
        comparisonList,
        selectedMoodFilter,
        isCartOpen,
        isWishlistOpen,
        toastMessage,
        setActiveView,
        setSelectedPerfume,
        setSelectedMoodFilter,
        addToCart,
        addDiscoverySetToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToComparison,
        removeFromComparison,
        setIsCartOpen,
        setIsWishlistOpen,
        showToast,
        cartCount,
        cartSubtotal
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
