export type Category = 'Small Plates' | 'Mains' | 'Desserts';

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  allergens?: string[];
}

export interface Booking {
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  occasion?: 'Birthday' | 'Anniversary' | 'Business' | 'None';
  allergies: string[];
  specialRequest?: string;
}

export const TIME_SLOTS = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
  '20:00', '20:30', '21:00', '21:30', '22:00'
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 's1',
    title: 'Deconstructed Samosa',
    description: 'Crispy pastry shards, spiced potato foam, tamarind pearls, and micro-cilantro.',
    price: 18,
    category: 'Small Plates',
    image: 'https://picsum.photos/seed/samosa/800/600',
    allergens: ['Gluten']
  },
  {
    id: 's2',
    title: 'Ochre Scallops',
    description: 'Pan-seared scallops with turmeric-infused cauliflower purée and curry leaf oil.',
    price: 24,
    category: 'Small Plates',
    image: 'https://picsum.photos/seed/scallops/800/600',
  },
  {
    id: 'm1',
    title: 'Braised Lamb Shank',
    description: '24-hour slow-cooked lamb, saffron mash, and a reduction of 12-spice dark jus.',
    price: 42,
    category: 'Mains',
    image: 'https://picsum.photos/seed/lamb/800/600',
  },
  {
    id: 'm2',
    title: 'Black Garlic Paneer',
    description: 'Smoked paneer steaks, black garlic glaze, and truffled spinach velvet.',
    price: 36,
    category: 'Mains',
    image: 'https://picsum.photos/seed/paneer/800/600',
    allergens: ['Dairy']
  },
  {
    id: 'd1',
    title: 'Molten Gold Fondant',
    description: '70% dark chocolate, liquid gold cardamom center, rose petal sorbet.',
    price: 16,
    category: 'Desserts',
    image: 'https://picsum.photos/seed/dessert1/800/600',
    allergens: ['Dairy', 'Gluten']
  },
  {
    id: 'd2',
    title: 'Saffron Mist',
    description: 'Espuma of saffron and pistachios, served over compressed honeycomb.',
    price: 14,
    category: 'Desserts',
    image: 'https://picsum.photos/seed/dessert2/800/600',
    allergens: ['Nuts', 'Dairy']
  }
];
