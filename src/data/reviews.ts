import { Review } from '../types/hotel';

export const mockReviews: Review[] = [
  {
    id: 'review_1',
    hotelId: '1',
    userId: 'user_1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    rating: 5,
    title: 'Absolutely Perfect Stay!',
    comment: 'The Ritz-Carlton Kyoto exceeded all expectations. The traditional Japanese aesthetics combined with luxury amenities created an unforgettable experience. The staff was incredibly attentive and the garden views were breathtaking. The location is perfect for exploring Kyoto\'s historic temples.',
    roomType: 'Kamogawa Suite',
    stayDate: '2024-01-15',
    createdAt: '2024-01-18T10:30:00Z',
    helpful: 12,
    categories: {
      cleanliness: 5,
      service: 5,
      location: 5,
      value: 4,
      amenities: 5
    }
  },
  {
    id: 'review_2',
    hotelId: '1',
    userId: 'user_2',
    userName: 'Michael Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    rating: 4,
    title: 'Great Hotel with Minor Issues',
    comment: 'Overall a wonderful stay. The hotel is beautiful and the service is top-notch. The room was spacious and comfortable. However, the price is quite steep and some of the amenities felt a bit dated. The breakfast was excellent though, and the location can\'t be beat.',
    roomType: 'Deluxe Room with Garden View',
    stayDate: '2024-01-10',
    createdAt: '2024-01-12T14:20:00Z',
    helpful: 8,
    categories: {
      cleanliness: 4,
      service: 5,
      location: 5,
      value: 3,
      amenities: 4
    }
  },
  {
    id: 'review_3',
    hotelId: '1',
    userId: 'user_3',
    userName: 'Emma Williams',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    rating: 5,
    title: 'Magical Experience in Kyoto',
    comment: 'This hotel is pure magic! From the moment we arrived, we were treated like royalty. The traditional design elements are stunning, and the modern amenities are perfect. The spa was incredibly relaxing after long days of sightseeing. Would definitely return!',
    roomType: 'Deluxe Room with Garden View',
    stayDate: '2024-01-08',
    createdAt: '2024-01-10T09:15:00Z',
    helpful: 15,
    categories: {
      cleanliness: 5,
      service: 5,
      location: 4,
      value: 4,
      amenities: 5
    }
  },
  {
    id: 'review_4',
    hotelId: '2',
    userId: 'user_4',
    userName: 'David Kim',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    rating: 4,
    title: 'Business Travel Paradise',
    comment: 'Perfect for business travelers. The Park Hyatt Tokyo offers excellent service and the location in Shinjuku is unbeatable. Rooms are modern and well-equipped. The views of Tokyo are spectacular, especially at night. Only downside was the busy lobby during peak hours.',
    roomType: 'Park Suite',
    stayDate: '2024-01-20',
    createdAt: '2024-01-22T16:45:00Z',
    helpful: 6,
    categories: {
      cleanliness: 5,
      service: 4,
      location: 5,
      value: 4,
      amenities: 4
    }
  },
  {
    id: 'review_5',
    hotelId: '2',
    userId: 'user_5',
    userName: 'Lisa Anderson',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
    rating: 5,
    title: 'Tokyo Luxury at Its Finest',
    comment: 'Absolutely incredible hotel! The design is stunning, the service impeccable, and the location couldn\'t be better. We loved having easy access to shopping, dining, and entertainment. The hotel restaurant was also fantastic. A truly luxurious Tokyo experience.',
    roomType: 'Deluxe Room City View',
    stayDate: '2024-01-12',
    createdAt: '2024-01-14T11:30:00Z',
    helpful: 9,
    categories: {
      cleanliness: 5,
      service: 5,
      location: 5,
      value: 4,
      amenities: 5
    }
  },
  {
    id: 'review_6',
    hotelId: '3',
    userId: 'user_6',
    userName: 'James Wilson',
    rating: 3,
    title: 'Good but Overpriced',
    comment: 'The hotel has a great location and decent amenities, but I felt it was overpriced for what you get. The room was smaller than expected and the service, while polite, wasn\'t exceptional. The breakfast buffet was good though, and the staff were helpful with local recommendations.',
    roomType: 'Standard Room',
    stayDate: '2024-01-05',
    createdAt: '2024-01-07T13:20:00Z',
    helpful: 3,
    categories: {
      cleanliness: 4,
      service: 3,
      location: 4,
      value: 2,
      amenities: 3
    }
  }
];