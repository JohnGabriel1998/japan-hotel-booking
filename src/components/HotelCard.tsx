import React from 'react';
import { Star, MapPin, Heart, Users } from '@phosphor-icons/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hotel } from '../types/hotel';
import { useKV } from '@github/spark/hooks';

interface HotelCardProps {
  hotel: Hotel;
  onViewDetails: (hotel: Hotel) => void;
}

export function HotelCard({ hotel, onViewDetails }: HotelCardProps) {
  const [favorites, setFavorites] = useKV<string[]>('favorite-hotels', []);

  const isFavorite = favorites.includes(hotel.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      isFavorite 
        ? prev.filter(id => id !== hotel.id)
        : [...prev, hotel.id]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      <div className="relative">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 h-8 w-8 rounded-full ${
            isFavorite 
              ? 'bg-red-500/90 text-white hover:bg-red-600/90' 
              : 'bg-white/90 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart size={16} weight={isFavorite ? 'fill' : 'regular'} />
        </Button>
      </div>
      
      <CardContent className="p-6" onClick={() => onViewDetails(hotel)}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-foreground line-clamp-2">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-sm">
            <Star size={16} weight="fill" className="text-yellow-500" />
            <span className="font-medium">{hotel.rating}</span>
            <span className="text-muted-foreground">({hotel.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin size={16} />
          <span className="text-sm">{hotel.location}, {hotel.prefecture}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {hotel.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {hotel.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{hotel.amenities.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">
              {formatPrice(hotel.priceRange.min)}
            </div>
            <div className="text-sm text-muted-foreground">per night</div>
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(hotel);
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}