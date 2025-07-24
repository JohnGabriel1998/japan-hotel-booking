import React, { useState } from 'react';
import { X, Star, MapPin, Users, Bed, Camera } from '@phosphor-icons/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReviewsSection } from './ReviewsSection';
import { Hotel, Room } from '../types/hotel';

interface HotelDetailsProps {
  hotel: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
  onBookRoom: (hotel: Hotel, room: Room) => void;
}

export function HotelDetails({ hotel, isOpen, onClose, onBookRoom }: HotelDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!hotel) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{hotel.name}</DialogTitle>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={16} />
            <span>{hotel.location}, {hotel.prefecture}</span>
            <div className="flex items-center gap-1 ml-4">
              <Star size={16} weight="fill" className="text-yellow-500" />
              <span className="font-medium">{hotel.rating}</span>
              <span>({hotel.reviewCount} reviews)</span>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Hotel Overview</TabsTrigger>
            <TabsTrigger value="reviews">Guest Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={hotel.images[selectedImageIndex]}
                  alt={hotel.name}
                  className="w-full h-80 object-cover rounded-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                >
                  <Camera size={16} className="mr-2" />
                  {selectedImageIndex + 1} / {hotel.images.length}
                </Button>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {hotel.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${hotel.name} ${index + 1}`}
                    className={`w-20 h-16 object-cover rounded cursor-pointer flex-shrink-0 ${
                      selectedImageIndex === index ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">About This Hotel</h3>
              <p className="text-muted-foreground">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Available Rooms</h3>
              <div className="space-y-4">
                {hotel.rooms.map((room) => (
                  <Card key={room.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <img
                          src={room.images[0]}
                          alt={room.name}
                          className="w-full md:w-48 h-32 object-cover"
                        />
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="text-lg font-semibold">{room.name}</h4>
                              <p className="text-sm text-muted-foreground">{room.type}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-primary">
                                {formatPrice(room.price)}
                              </div>
                              <div className="text-sm text-muted-foreground">per night</div>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">
                            {room.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users size={16} />
                                <span>Up to {room.capacity} guests</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Bed size={16} />
                                <span>{room.type} Room</span>
                              </div>
                            </div>

                            <Button
                              onClick={() => onBookRoom(hotel, room)}
                              disabled={!room.available}
                              className="bg-accent hover:bg-accent/90 text-accent-foreground"
                            >
                              {room.available ? 'Book Now' : 'Unavailable'}
                            </Button>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-3">
                            {room.amenities.map((amenity) => (
                              <Badge key={amenity} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ReviewsSection hotel={hotel} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}