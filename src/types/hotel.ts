export interface Hotel {
  id: string;
  name: string;
  location: string;
  prefecture: string;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  amenities: string[];
  rooms: Room[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface Room {
  id: string;
  type: string;
  name: string;
  description: string;
  capacity: number;
  price: number;
  amenities: string[];
  images: string[];
  available: boolean;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  guestDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  priceRange: [number, number];
  amenities: string[];
}

export interface Review {
  id: string;
  hotelId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  roomType?: string;
  stayDate: string;
  createdAt: string;
  helpful: number;
  photos?: ReviewPhoto[];
  categories: {
    cleanliness: number;
    service: number;
    location: number;
    value: number;
    amenities: number;
  };
}

export interface ReviewPhoto {
  id: string;
  url: string;
  caption?: string;
  uploadedAt: string;
}