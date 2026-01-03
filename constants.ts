import { Car, MenuItem, MenuItemType } from './types';

export const CAR_INVENTORY: Car[] = [
  {
    id: '1',
    name: 'Suzuki Wagon R FZ Safety',
    category: 'Compact Hybrid',
    year: 2018,
    pricePerDay: 4500,
    currency: 'LKR',
    features: ['Push Start', 'Safety Package', 'Climate Control', 'Bluetooth Audio', 'Reverse Camera', 'ABS'],
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200', // White compact car front
    gallery: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200', // Front Angle
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200', // Driving/Side
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1200', // Interior Dashboard
      'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=1200', // Keys/Detail
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=1200', // Rear/Tail
    ],
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 4,
    description: 'The Suzuki Wagon R FZ Safety is the perfect city companion. Featuring a highly efficient hybrid engine, advanced safety features including collision mitigation, and a spacious interior despite its compact footprint. Ideal for navigating busy streets with maximum fuel economy and comfort.'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Pricing Options', href: 'PRICING', type: MenuItemType.LINK },
  { label: 'Fleet Gallery', href: 'GALLERY', type: MenuItemType.LINK },
  { label: 'My Bookings', href: 'MY_BOOKINGS', type: MenuItemType.LINK },
  { label: 'Customer Reviews', href: 'REVIEWS', type: MenuItemType.LINK },
  { label: 'Terms & Conditions', href: 'TERMS', type: MenuItemType.LINK },
  { label: 'FAQ', href: 'FAQ', type: MenuItemType.LINK },
  { label: 'Contact Support', href: 'SUPPORT', type: MenuItemType.LINK },
];

export const SYSTEM_INSTRUCTION = `
You are the AI assistant for VL Rent a Car. Your goal is to help customers interested in our Suzuki Wagon R FZ Safety (2018 Hybrid).
Adopt a professional, efficient tone.
We currently offer:
${JSON.stringify(CAR_INVENTORY.map(c => `${c.name} (${c.year} ${c.fuelType}) - ${c.currency} ${c.pricePerDay}/day`))}

If a user asks about other cars, politely inform them that we currently specialize in the Wagon R FZ Safety for the best city driving experience.
Highlight fuel efficiency (Hybrid) and safety features.
`;