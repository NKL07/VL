export interface Car {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  currency: string;
  year: number;
  features: string[];
  imageUrl: string;
  gallery: string[];
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  seats: number;
  description: string;
}

export interface Booking {
  id: string;
  carName: string;
  dates: string;
  status: 'Confirmed' | 'Cancelled' | 'Completed' | 'Ongoing';
  price: string;
  totalAmount: number; // For calculations
  image: string;
  pickupTime: string;
  location: string;
  mileageLimit: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum MenuItemType {
  LINK = 'LINK',
  ACTION = 'ACTION'
}

export interface MenuItem {
  label: string;
  href?: string;
  type: MenuItemType;
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email?: string; // Optional depending on form
}