import React from 'react';
import { Heart, CalendarDots, MapPin } from '@phosphor-icons/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useKV } from '@github/spark/hooks';
import { Hotel } from '../types/hotel';
import { mockHotels } from '../data/hotels';

interface FavoritesPageProps {
  onViewHotel: (hotel: Hotel) => void;
}

export function FavoritesPage({ onViewHotel }: FavoritesPageProps) {
  const [favorites] = useKV<string[]>('favorite-hotels', []);

  const favoriteHotels = mockHotels.filter(hotel => favorites.includes(hotel.id));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (favoriteHotels.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <Heart size={64} className="text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
          <p className="text-muted-foreground mb-8">
            Start exploring hotels and add them to your favorites to see them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Favorite Hotels</h1>
        <p className="text-muted-foreground">
          {favoriteHotels.length} hotel{favoriteHotels.length > 1 ? 's' : ''} saved
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteHotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full">
                <Heart size={16} weight="fill" />
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                {hotel.name}
              </h3>

              <div className="flex items-center gap-1 text-muted-foreground mb-3">
                <MapPin size={16} />
                <span className="text-sm">{hotel.location}, {hotel.prefecture}</span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {hotel.description}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-primary">
                    {formatPrice(hotel.priceRange.min)}
                  </div>
                  <div className="text-sm text-muted-foreground">per night</div>
                </div>
                <Button 
                  onClick={() => onViewHotel(hotel)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  View Hotel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}