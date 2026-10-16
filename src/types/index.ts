export type Mood =
  | 'Fresh and Clean'
  | 'Warm and Woody'
  | 'Floral and Romantic'
  | 'Sweet and Sensual'
  | 'Aquatic and Airy'
  | 'Deep and Mysterious';

export type FragranceFamily =
  | 'Fresh & Citrus'
  | 'Woody & Amber'
  | 'Floral & Botanical'
  | 'Gourmand & Fruity'
  | 'Aquatic & Ozonic'
  | 'Oriental & Spicy';

export type Intensity = 'Subtle' | 'Moderate' | 'Intense';

export type Occasion =
  | 'Everyday Signature'
  | 'Evening & Gala'
  | 'Intimate & Sensual'
  | 'Summer & Sunlit'
  | 'Autumn & Winter Fireside'
  | 'Rainy Days & Reflection';

export interface Perfume {
  id: string;
  name: string;
  tagline: string;
  description: string;
  story: string;
  price50ml: number;
  price100ml: number;
  bottleSizes: ('50ml' | '100ml')[];
  fragranceFamily: FragranceFamily;
  mood: Mood;
  occasion: Occasion;
  intensity: Intensity;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  season: string;
  image: string;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface CartItem {
  id: string;
  perfumeId?: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
  isDiscoverySet?: boolean;
  discoveryItems?: Perfume[];
}

export interface DiscoverySetState {
  items: Perfume[];
  price: number;
}
