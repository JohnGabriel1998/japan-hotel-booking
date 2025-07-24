import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Hotel, Room, Booking } from '../types/hotel';
import { useKV } from '@github/spark/hooks';
import { CalendarDots, Users, CreditCard } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface BookingModalProps {
  hotel: Hotel | null;
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export function BookingModal({ 
  hotel, 
  room, 
  isOpen, 
  onClose, 
  checkIn, 
  checkOut, 
  guests 
}: BookingModalProps) {
  const [bookings, setBookings] = useKV<Booking[]>('user-bookings', []);
  const [guestDetails, setGuestDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  if (!hotel || !room) return null;

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalPrice = nights * room.price;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBooking = async () => {
    if (!guestDetails.firstName || !guestDetails.lastName || !guestDetails.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    const booking: Booking = {
      id: Date.now().toString(),
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomId: room.id,
      roomName: room.name,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      guestDetails,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [...prev, booking]);
    
    toast.success('Booking confirmed successfully!', {
      description: `Your reservation at ${hotel.name} is confirmed.`
    });

    onClose();
    
    // Reset form
    setGuestDetails({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Complete Your Booking</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{hotel.name}</h3>
                    <p className="text-muted-foreground">{room.name}</p>
                  </div>
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-16 h-12 object-cover rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarDots size={16} className="text-muted-foreground" />
                    <div>
                      <div className="font-medium">Check-in</div>
                      <div className="text-muted-foreground">
                        {new Date(checkIn).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDots size={16} className="text-muted-foreground" />
                    <div>
                      <div className="font-medium">Check-out</div>
                      <div className="text-muted-foreground">
                        {new Date(checkOut).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-muted-foreground" />
                    <div>
                      <div className="font-medium">Guests</div>
                      <div className="text-muted-foreground">{guests} guest{guests > 1 ? 's' : ''}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-muted-foreground" />
                    <div>
                      <div className="font-medium">{nights} night{nights > 1 ? 's' : ''}</div>
                      <div className="text-muted-foreground">{formatPrice(room.price)} per night</div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guest Details Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Guest Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={guestDetails.firstName}
                  onChange={(e) => setGuestDetails(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={guestDetails.lastName}
                  onChange={(e) => setGuestDetails(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={guestDetails.email}
                onChange={(e) => setGuestDetails(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={guestDetails.phone}
                onChange={(e) => setGuestDetails(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleBooking}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}