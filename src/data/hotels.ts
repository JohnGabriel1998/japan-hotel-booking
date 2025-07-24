import { Hotel } from '../types/hotel';

export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'The Ritz-Carlton Kyoto',
    location: 'Kyoto',
    prefecture: 'Kyoto',
    description: 'Luxury hotel overlooking the Kamogawa River and Higashiyama mountains, blending traditional Japanese aesthetics with modern comfort.',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 1247,
    amenities: ['Spa', 'Restaurant', 'Bar', 'Fitness Center', 'Concierge', 'Room Service'],
    priceRange: { min: 45000, max: 120000 },
    rooms: [
      {
        id: '1-1',
        type: 'Deluxe',
        name: 'Deluxe Room with Garden View',
        description: 'Spacious room with traditional Japanese elements and garden views',
        capacity: 2,
        price: 45000,
        amenities: ['Garden View', 'Mini Bar', 'Free WiFi', 'Air Conditioning'],
        images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'],
        available: true
      },
      {
        id: '1-2',
        type: 'Suite',
        name: 'Kamogawa Suite',
        description: 'Luxurious suite with panoramic river views and separate living area',
        capacity: 4,
        price: 120000,
        amenities: ['River View', 'Living Room', 'Butler Service', 'Premium Amenities'],
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'],
        available: true
      }
    ]
  },
  {
    id: '2',
    name: 'Park Hyatt Tokyo',
    location: 'Shinjuku',
    prefecture: 'Tokyo',
    description: 'Sophisticated hotel in the heart of Tokyo with stunning city views and contemporary design.',
    images: [
      'https://images.unsplash.com/photo-1555686637-b830e73a25c8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 892,
    amenities: ['Spa', 'Pool', 'Restaurant', 'Bar', 'Fitness Center', 'Business Center'],
    priceRange: { min: 38000, max: 95000 },
    rooms: [
      {
        id: '2-1',
        type: 'Park',
        name: 'Park Room',
        description: 'Modern room with park views and contemporary amenities',
        capacity: 2,
        price: 38000,
        amenities: ['Park View', 'Mini Bar', 'Free WiFi', 'Marble Bathroom'],
        images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'],
        available: true
      }
    ]
  },
  {
    id: '3',
    name: 'Hoshinoya Tokyo',
    location: 'Otemachi',
    prefecture: 'Tokyo',
    description: 'Traditional ryokan-style hotel in modern Tokyo, offering authentic Japanese hospitality.',
    images: [
      'https://images.unsplash.com/photo-1578662015928-3badd62c5f3b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 654,
    amenities: ['Traditional Onsen', 'Tea Ceremony', 'Traditional Restaurant', 'Concierge'],
    priceRange: { min: 55000, max: 150000 },
    rooms: [
      {
        id: '3-1',
        type: 'Sakura',
        name: 'Sakura Room',
        description: 'Traditional Japanese room with tatami floors and futon beds',
        capacity: 2,
        price: 55000,
        amenities: ['Tatami Floors', 'Futon Beds', 'Traditional Bath', 'City View'],
        images: ['https://images.unsplash.com/photo-1578662015928-3badd62c5f3b?w=800&h=600&fit=crop'],
        available: true
      }
    ]
  },
  {
    id: '4',
    name: 'Four Seasons Hotel Kyoto',
    location: 'Higashiyama',
    prefecture: 'Kyoto',
    description: 'Elegant hotel surrounded by traditional temples and shrines in historic Kyoto.',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
    ],
    rating: 4.6,
    reviewCount: 1089,
    amenities: ['Spa', 'Restaurant', 'Garden', 'Tea House', 'Cultural Experiences'],
    priceRange: { min: 42000, max: 110000 },
    rooms: [
      {
        id: '4-1',
        type: 'Premier',
        name: 'Premier Garden Room',
        description: 'Elegant room overlooking traditional Japanese gardens',
        capacity: 2,
        price: 42000,
        amenities: ['Garden View', 'Traditional Decor', 'Premium Amenities', 'Tea Service'],
        images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'],
        available: true
      }
    ]
  },
  {
    id: '5',
    name: 'Conrad Osaka',
    location: 'Nakanoshima',
    prefecture: 'Osaka',
    description: 'Modern luxury hotel with panoramic views of Osaka Bay and contemporary design.',
    images: [
      'https://images.unsplash.com/photo-1555686637-b830e73a25c8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
    rating: 4.5,
    reviewCount: 756,
    amenities: ['Sky Bar', 'Spa', 'Pool', 'Multiple Restaurants', 'Executive Lounge'],
    priceRange: { min: 35000, max: 85000 },
    rooms: [
      {
        id: '5-1',
        type: 'Bay View',
        name: 'Bay View Room',
        description: 'Modern room with stunning views of Osaka Bay',
        capacity: 2,
        price: 35000,
        amenities: ['Bay View', 'Modern Design', 'Premium Bedding', 'High-Speed WiFi'],
        images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'],
        available: true
      }
    ]
  },
  {
    id: '6',
    name: 'Gora Kadan',
    location: 'Hakone',
    prefecture: 'Kanagawa',
    description: 'Traditional ryokan with private onsen baths and mountain views in Hakone.',
    images: [
      'https://images.unsplash.com/photo-1578662015928-3badd62c5f3b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 423,
    amenities: ['Private Onsen', 'Kaiseki Dining', 'Traditional Gardens', 'Mountain Views'],
    priceRange: { min: 65000, max: 180000 },
    rooms: [
      {
        id: '6-1',
        type: 'Mountain Villa',
        name: 'Traditional Villa with Private Onsen',
        description: 'Luxurious traditional villa with private hot spring bath',
        capacity: 4,
        price: 65000,
        amenities: ['Private Onsen', 'Mountain View', 'Traditional Architecture', 'Kaiseki Meals'],
        images: ['https://images.unsplash.com/photo-1578662015928-3badd62c5f3b?w=800&h=600&fit=crop'],
        available: true
      }
    ]
  }
];